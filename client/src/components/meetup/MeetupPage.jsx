import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Coffee,
  Calendar,
  Clock,
  MapPin,
  CheckCircle,
  XCircle,
  ArrowLeft,
  Sparkles,
  AlertCircle,
} from 'lucide-react';
import { meetupAPI, matchAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { MeetupChecklist } from './MeetupChecklist';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Avatar } from '../ui/Avatar';
import { Spinner } from '../ui/Spinner';

export const MeetupPage = () => {
  const { matchId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [match, setMatch] = useState(null);
  const [meetups, setMeetups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showProposalForm, setShowProposalForm] = useState(false);

  const [formData, setFormData] = useState({
    proposedDate: '',
    proposedTime: '18:00',
    location: '',
    locationDetails: '',
    message: '',
  });

  useEffect(() => {
    fetchData();
  }, [matchId]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [mRes, meetRes] = await Promise.all([
        matchAPI.getMatch(matchId),
        meetupAPI.getMeetups(matchId),
      ]);
      if (mRes.data.success) setMatch(mRes.data.data);
      if (meetRes.data.success) setMeetups(meetRes.data.data || []);
    } catch (err) {
      console.error('Error fetching meetup details:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePropose = async (e) => {
    e.preventDefault();
    try {
      const res = await meetupAPI.createMeetup({
        matchId,
        ...formData,
      });
      if (res.data.success) {
        setMeetups([res.data.data, ...meetups]);
        setShowProposalForm(false);
      }
    } catch (err) {
      console.error('Propose meetup error:', err);
    }
  };

  const handleRespond = async (meetupId, status) => {
    try {
      const res = await meetupAPI.respondToMeetup(meetupId, { status });
      if (res.data.success) {
        setMeetups((prev) =>
          prev.map((m) => (m._id === meetupId ? res.data.data : m))
        );
      }
    } catch (err) {
      console.error('Respond error:', err);
    }
  };

  const handleToggleChecklist = async (meetupId, key) => {
    const targetMeetup = meetups.find((m) => m._id === meetupId);
    if (!targetMeetup) return;

    const currentVal = targetMeetup.checklist?.[key] || false;
    const updatedChecklist = {
      ...targetMeetup.checklist,
      [key]: !currentVal,
    };

    try {
      const res = await meetupAPI.updateChecklist(meetupId, { checklist: updatedChecklist });
      if (res.data.success) {
        setMeetups((prev) =>
          prev.map((m) => (m._id === meetupId ? res.data.data : m))
        );
      }
    } catch (err) {
      console.error('Checklist update error:', err);
    }
  };

  if (loading) {
    return (
      <div className="py-32 flex justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  const partner = match?.users?.find((u) => u._id !== user?._id) || match?.users?.[0];
  const activeMeetup = meetups[0];

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Header with back */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Match
        </button>

        <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full">
          Meet Before You Move
        </span>
      </div>

      {/* Hero Match Summary */}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-soft flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <Avatar
            src={partner?.profilePicture}
            name={partner?.fullName}
            size="xl"
            className="ring-2 ring-indigo-100"
          />
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Meetup with {partner?.fullName}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {match?.compatibilityScore || 90}% Compatibility • Always meet in public places like a cafe
            </p>
          </div>
        </div>

        <Button
          onClick={() => setShowProposalForm(!showProposalForm)}
          variant="gradient"
          size="md"
        >
          <Coffee className="w-4 h-4 mr-2" />
          {showProposalForm ? 'Close Form' : 'Propose New Meetup'}
        </Button>
      </div>

      {/* Propose Meetup Form */}
      {showProposalForm && (
        <form
          onSubmit={handlePropose}
          className="bg-white p-6 rounded-3xl border border-indigo-100 shadow-soft space-y-4"
        >
          <h3 className="text-base font-bold text-slate-900">Suggest a Coffee Meetup</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Date"
              type="date"
              value={formData.proposedDate}
              onChange={(e) => setFormData({ ...formData, proposedDate: e.target.value })}
              icon={Calendar}
              required
            />

            <Input
              label="Time"
              type="time"
              value={formData.proposedTime}
              onChange={(e) => setFormData({ ...formData, proposedTime: e.target.value })}
              icon={Clock}
              required
            />
          </div>

          <Input
            label="Public Meeting Location"
            placeholder="e.g. Third Wave Coffee, 12th Main Indiranagar"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            icon={MapPin}
            required
          />

          <Input
            label="Note or Expectations"
            placeholder="e.g. Let's chat over cold brew about the room lease and move-in timeline!"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          />

          <Button type="submit" variant="primary" size="md" className="w-full">
            Send Meetup Request
          </Button>
        </form>
      )}

      {/* Active / Existing Meetup Status Card */}
      {activeMeetup && (
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-soft space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Scheduled Meetup
                </span>
                <span
                  className={`text-xs font-extrabold px-2.5 py-0.5 rounded-full capitalize ${
                    activeMeetup.status === 'accepted'
                      ? 'bg-emerald-100 text-emerald-800'
                      : activeMeetup.status === 'pending'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-rose-100 text-rose-800'
                  }`}
                >
                  {activeMeetup.status}
                </span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-indigo-600" />
                {activeMeetup.location}
              </h3>
              <p className="text-xs text-slate-500 mt-1 flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5" />
                {new Date(activeMeetup.proposedDate).toLocaleDateString([], {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                })}{' '}
                at {activeMeetup.proposedTime}
              </p>
            </div>

            {/* Accept / Decline buttons if requested to current user */}
            {activeMeetup.status === 'pending' &&
              activeMeetup.requestedTo?._id === user?._id && (
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleRespond(activeMeetup._id, 'declined')}
                    variant="secondary"
                    size="sm"
                    className="text-rose-600"
                  >
                    <XCircle className="w-4 h-4 mr-1" />
                    Decline
                  </Button>
                  <Button
                    onClick={() => handleRespond(activeMeetup._id, 'accepted')}
                    variant="primary"
                    size="sm"
                  >
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Accept Meetup
                  </Button>
                </div>
              )}
          </div>

          {activeMeetup.message && (
            <p className="text-xs text-slate-600 italic bg-slate-50 p-3 rounded-xl border border-slate-100">
              "{activeMeetup.message}"
            </p>
          )}

          {/* Interactive Checklist for this Meetup */}
          <MeetupChecklist
            checklist={activeMeetup.checklist || {}}
            onToggleItem={(key) => handleToggleChecklist(activeMeetup._id, key)}
          />
        </div>
      )}

      {/* Safety guidelines note */}
      <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-amber-900 text-xs flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold">Meet Safely & Protect Your Finances</p>
          <p className="text-amber-800 leading-relaxed">
            Never transfer security deposits or rent cash before physically inspecting the property and meeting the flatmates in person. Always verify lease documentation.
          </p>
        </div>
      </div>
    </div>
  );
};
