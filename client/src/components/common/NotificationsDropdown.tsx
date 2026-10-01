import React, { useState } from 'react';
import { Bell, CloudRain, Users, AlertTriangle, Sparkles, CheckCheck, X } from 'lucide-react';
import { NotificationItem } from '../../types';

export const NotificationsDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'notif-1',
      title: 'Crowd Spike Alert: Mahabalipuram',
      message: 'Shore Temple is currently seeing peak queue times (approx. 45 mins). Consider visiting Sadras Fort alternative or waiting until 4:30 PM.',
      type: 'crowd',
      timestamp: '15 mins ago',
      read: false
    },
    {
      id: 'notif-2',
      title: 'Weather Radar: Light Rain Expected',
      message: 'Rain expected at 3:00 PM along ECR. AI recommends visiting the indoor DakshinaChitra Museum first.',
      type: 'weather',
      timestamp: '1 hour ago',
      read: false
    },
    {
      id: 'notif-3',
      title: 'Smart Budget Milestone',
      message: 'You have utilized 68.4% (₹3,420) of your ₹5,000 trip budget. ₹1,580 safe margin remaining.',
      type: 'budget',
      timestamp: '2 hours ago',
      read: true
    },
    {
      id: 'notif-4',
      title: 'Artisan Workshop Confirmed',
      message: 'Your slot for the Swamimalai Lost-Wax Bronze Workshop is confirmed for tomorrow 2:00 PM.',
      type: 'trip',
      timestamp: 'Yesterday',
      read: true
    }
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'crowd':
        return <Users className="w-4 h-4 text-amber-400" />;
      case 'weather':
        return <CloudRain className="w-4 h-4 text-oceanblue-400" />;
      case 'budget':
        return <AlertTriangle className="w-4 h-4 text-terracotta-400" />;
      default:
        return <Sparkles className="w-4 h-4 text-emerald-400" />;
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg text-warmwhite-300 hover:text-white hover:bg-charcoal-800 transition-colors border border-white/5"
        title="Notifications"
      >
        <Bell className="w-4 h-4" />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-terracotta-500 animate-pulse" />
        )}
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-charcoal-900/95 backdrop-blur-xl border border-white/15 shadow-depth-lg p-3 z-50 animate-in fade-in zoom-in-95 duration-150"
          onMouseLeave={() => setIsOpen(false)}
        >
          <div className="flex items-center justify-between pb-2.5 border-b border-white/10 mb-2">
            <div className="flex items-center gap-2">
              <span className="font-serif text-xs font-bold text-white uppercase tracking-wider">
                Notifications
              </span>
              {unreadCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-terracotta-500/20 text-terracotta-400 text-[10px] font-bold">
                  {unreadCount} new
                </span>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllRead}
                className="text-[10px] text-warmwhite-300/70 hover:text-white flex items-center gap-1"
              >
                <CheckCheck className="w-3 h-3" /> Mark all read
              </button>
            )}
          </div>

          <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
            {notifications.map((item) => (
              <div
                key={item.id}
                className={`p-3 rounded-xl border transition-colors flex items-start gap-3 ${
                  item.read
                    ? 'bg-charcoal-850/50 border-white/5'
                    : 'bg-charcoal-800/90 border-white/10'
                }`}
              >
                <div className="p-2 rounded-lg bg-charcoal-900 shrink-0 mt-0.5">
                  {getIcon(item.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-white leading-tight">{item.title}</p>
                  <p className="text-[11px] text-warmwhite-300/80 mt-1 leading-relaxed">{item.message}</p>
                  <span className="text-[10px] text-warmwhite-300/40 mt-1.5 block font-mono">
                    {item.timestamp}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 text-center border-t border-white/5 mt-2">
            <span className="text-[10px] text-warmwhite-300/50 font-mono">
              Live alerts powered by OorTrip AI engine
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
