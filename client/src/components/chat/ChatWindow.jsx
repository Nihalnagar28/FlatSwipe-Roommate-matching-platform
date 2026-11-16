import React, { useState, useEffect, useRef } from 'react';
import { Send, Coffee, Info, CheckCircle, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { messageAPI } from '../../services/api';
import { useSocket } from '../../context/SocketContext';
import { Avatar } from '../ui/Avatar';
import { Button } from '../ui/Button';
import { MessageBubble } from './MessageBubble';
import { Spinner } from '../ui/Spinner';

export const ChatWindow = ({
  match,
  currentUserId,
  onBackMobile,
  onOpenDetails,
}) => {
  const { socket } = useSocket();
  const navigate = useNavigate();

  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(true);
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  const partner = match?.users?.find((u) => u._id !== currentUserId) || match?.users?.[0];

  useEffect(() => {
    if (match?._id) {
      fetchMessages();

      if (socket) {
        socket.emit('join_match', match._id);

        const handleReceiveMessage = (newMsg) => {
          if (newMsg.match === match._id) {
            setMessages((prev) => [...prev, newMsg]);
            scrollToBottom();
          }
        };

        const handleUserTyping = (data) => {
          if (data.matchId === match._id && data.userId !== currentUserId) {
            setIsTyping(true);
          }
        };

        const handleUserStopTyping = (data) => {
          if (data.matchId === match._id) {
            setIsTyping(false);
          }
        };

        socket.on('receive_message', handleReceiveMessage);
        socket.on('user_typing', handleUserTyping);
        socket.on('user_stop_typing', handleUserStopTyping);

        return () => {
          socket.emit('leave_match', match._id);
          socket.off('receive_message', handleReceiveMessage);
          socket.off('user_typing', handleUserTyping);
          socket.off('user_stop_typing', handleUserStopTyping);
        };
      }
    }
  }, [match?._id, socket]);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await messageAPI.getMessages(match._id, { limit: 100 });
      if (res.data.success) {
        setMessages((res.data.data || []).reverse());
        scrollToBottom();
      }
    } catch (err) {
      console.error('Error fetching messages:', err);
    } finally {
      setLoading(false);
    }
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);

    if (socket && match) {
      socket.emit('typing', {
        matchId: match._id,
        userId: currentUserId,
        userName: 'Flatmate',
      });

      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = setTimeout(() => {
        socket.emit('stop_typing', { matchId: match._id, userId: currentUserId });
      }, 1500);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const text = inputText.trim();
    setInputText('');

    if (socket && partner) {
      socket.emit('send_message', {
        matchId: match._id,
        senderId: currentUserId,
        receiverId: partner._id,
        content: text,
        messageType: 'text',
      });
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      socket.emit('stop_typing', { matchId: match._id, userId: currentUserId });
    } else {
      // Fallback to REST API
      try {
        const res = await messageAPI.sendMessage(match._id, { content: text });
        if (res.data.success) {
          setMessages((prev) => [...prev, res.data.data]);
          scrollToBottom();
        }
      } catch (err) {
        console.error('Send error:', err);
      }
    }
  };

  if (!match || !partner) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#F8F8F5] text-xs text-[#737B74] p-8">
        Select a conversation from the sidebar to chat
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-[#F8F8F5]">
      {/* Top Header */}
      <div className="bg-white border-b border-[#E5E7E2] p-3 sm:p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {onBackMobile && (
            <button
              onClick={onBackMobile}
              className="lg:hidden p-1.5 text-[#737B74] hover:bg-[#F8F8F5] rounded-lg"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}

          <Avatar
            src={partner.profilePicture}
            name={partner.fullName}
            size="md"
            isOnline={partner.isOnline}
          />

          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-bold text-sm text-[#202622]">{partner.fullName}</h3>
              {partner.verificationBadge && (
                <CheckCircle className="w-3.5 h-3.5 text-[#315C4C] fill-[#E8EAE3]" />
              )}
            </div>
            <p className="text-[11px] text-[#737B74]">
              {isTyping ? (
                <span className="text-[#315C4C] font-semibold animate-pulse">Typing...</span>
              ) : partner.isOnline ? (
                <span className="text-[#3D7A5C] font-medium">Online</span>
              ) : (
                'Active recently'
              )}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={() => navigate(`/meetup/${match._id}`)}
            variant="secondary"
            size="sm"
            className="text-xs"
          >
            <Coffee className="w-3.5 h-3.5 mr-1" />
            <span className="hidden sm:inline">Schedule</span> Meetup
          </Button>

          {onOpenDetails && (
            <button
              onClick={onOpenDetails}
              className="p-2 text-[#737B74] hover:text-[#202622] rounded-lg hover:bg-[#F8F8F5] transition-colors"
              title="View Compatibility"
            >
              <Info className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Messages Feed */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-2">
        {loading ? (
          <div className="py-20 flex justify-center">
            <Spinner size="md" />
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-12 h-12 rounded-xl bg-[#E8EAE3] text-[#315C4C] flex items-center justify-center mx-auto mb-2">
              <Coffee className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-[#202622]">You matched with {partner.fullName}!</h4>
            <p className="text-xs text-[#737B74] max-w-xs mx-auto mt-1">
              Break the ice! Ask about their moving timeline, preferred neighborhoods, or daily routines.
            </p>
          </div>
        ) : (
          messages.map((msg) => (
            <MessageBubble
              key={msg._id}
              message={msg}
              isMe={msg.sender?._id === currentUserId || msg.sender === currentUserId}
            />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form onSubmit={handleSendMessage} className="p-3 sm:p-4 bg-white border-t border-[#E5E7E2] flex items-center gap-2">
        <input
          type="text"
          value={inputText}
          onChange={handleInputChange}
          placeholder={`Message ${partner.fullName}...`}
          className="flex-1 px-4 py-2.5 rounded-lg bg-[#F8F8F5] border border-[#E5E7E2] text-sm text-[#202622] placeholder:text-[#9EA397] focus:bg-white focus:border-[#315C4C] focus:outline-none transition-colors"
        />
        <Button
          type="submit"
          variant="primary"
          size="md"
          disabled={!inputText.trim()}
          className="rounded-lg px-4"
        >
          <Send className="w-4 h-4" />
        </Button>
      </form>
    </div>
  );
};
