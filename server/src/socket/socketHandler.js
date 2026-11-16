const User = require('../models/User');
const Message = require('../models/Message');
const Match = require('../models/Match');
const { Notification } = require('../models/Others');

const userSockets = new Map(); // userId -> socketId

const setupSocket = (io) => {
  io.on('connection', async (socket) => {
    const userId = socket.handshake.query.userId;

    if (userId) {
      userSockets.set(userId, socket.id);
      socket.userId = userId;

      try {
        await User.findByIdAndUpdate(userId, {
          isOnline: true,
          socketId: socket.id,
          lastActive: new Date(),
        });
        io.emit('user_online', { userId });
      } catch (err) {
        console.error('Socket online error:', err.message);
      }
    }

    // Join match room
    socket.on('join_match', (matchId) => {
      socket.join(`match_${matchId}`);
    });

    // Leave match room
    socket.on('leave_match', (matchId) => {
      socket.leave(`match_${matchId}`);
    });

    // Send real-time message
    socket.on('send_message', async (data) => {
      try {
        const { matchId, senderId, receiverId, content, messageType } = data;

        const message = await Message.create({
          match: matchId,
          sender: senderId,
          receiver: receiverId,
          content,
          messageType: messageType || 'text',
        });

        await Match.findByIdAndUpdate(matchId, {
          lastMessage: message._id,
          lastMessageAt: message.createdAt,
        });

        const populated = await Message.findById(message._id)
          .populate('sender', 'fullName profilePicture')
          .populate('receiver', 'fullName profilePicture');

        // Broadcast to match room
        io.to(`match_${matchId}`).emit('receive_message', populated);

        // Notify recipient if they have an active socket outside room
        const receiverSocketId = userSockets.get(receiverId);
        if (receiverSocketId) {
          io.to(receiverSocketId).emit('new_message_notification', {
            matchId,
            message: populated,
          });
        }
      } catch (err) {
        socket.emit('message_error', { message: err.message });
      }
    });

    // Typing indicators
    socket.on('typing', ({ matchId, userId, userName }) => {
      socket.to(`match_${matchId}`).emit('user_typing', { matchId, userId, userName });
    });

    socket.on('stop_typing', ({ matchId, userId }) => {
      socket.to(`match_${matchId}`).emit('user_stop_typing', { matchId, userId });
    });

    // Read receipts
    socket.on('mark_read', async ({ matchId, userId }) => {
      try {
        await Message.updateMany(
          { match: matchId, receiver: userId, isRead: false },
          { isRead: true, readAt: new Date() }
        );
        socket.to(`match_${matchId}`).emit('messages_read', { matchId, readBy: userId });
      } catch (err) {
        console.error('Mark read error:', err.message);
      }
    });

    // Disconnect
    socket.on('disconnect', async () => {
      if (socket.userId) {
        userSockets.delete(socket.userId);
        try {
          await User.findByIdAndUpdate(socket.userId, {
            isOnline: false,
            socketId: null,
            lastActive: new Date(),
          });
          io.emit('user_offline', { userId: socket.userId });
        } catch (err) {
          console.error('Disconnect error:', err.message);
        }
      }
    });
  });
};

module.exports = setupSocket;
