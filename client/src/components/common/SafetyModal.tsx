import React, { useState } from 'react';
import { ShieldAlert, PhoneCall, HeartPulse, Shield, MapPin, Share2, AlertTriangle, CheckCircle2, X } from 'lucide-react';

interface SafetyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SafetyModal: React.FC<SafetyModalProps> = ({ isOpen, onClose }) => {
  const [confirmAction, setConfirmAction] = useState<string | null>(null);
  const [actionDone, setActionDone] = useState<string | null>(null);
  const [locationShared, setLocationShared] = useState(false);

  if (!isOpen) return null;

  const contacts = [
    { name: 'Police Control Room', number: '100', icon: Shield, color: 'text-blue-400', desc: 'Direct Tamil Nadu Police Emergency Dispatch' },
    { name: 'Ambulance & Medical', number: '108', icon: HeartPulse, color: 'text-red-400', desc: 'State 24x7 Free Emergency Medical Service' },
    { name: 'Tourist Helpline (Tamil Nadu)', number: '1363', icon: PhoneCall, color: 'text-emerald-400', desc: 'Multi-lingual Ministry of Tourism Support' },
    { name: 'Women Safety Helpline', number: '1091', icon: ShieldAlert, color: 'text-rose-400', desc: 'Tamil Nadu Dedicated Safety & Rapid Response' }
  ];

  const handleTriggerAction = (targetName: string) => {
    setConfirmAction(targetName);
  };

  const handleConfirmExecute = () => {
    setActionDone(confirmAction);
    setConfirmAction(null);
    setTimeout(() => {
      setActionDone(null);
    }, 4000);
  };

  const handleShareLocation = () => {
    setLocationShared(true);
    setTimeout(() => setLocationShared(false), 3500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl bg-charcoal-900 border border-red-500/30 p-6 shadow-depth-3d space-y-6">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400 animate-pulse">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
                Tamil Nadu Tourist Safety & SOS
              </h3>
              <p className="text-xs text-red-400/90 font-medium">
                Prototype Emergency Dispatch Simulation
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-warmwhite-300 hover:text-white hover:bg-charcoal-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notice */}
        <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300 flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <p>
            <strong>Safety Protocol:</strong> In accordance with safety regulations, emergency actions require explicit confirmation before transmitting alerts. All simulated calls use official Tamil Nadu emergency numbers.
          </p>
        </div>

        {/* Location Beacon */}
        <div className="p-4 rounded-2xl bg-charcoal-850 border border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-white">Live GPS Location Beacon</p>
              <p className="text-[11px] text-warmwhite-300/70">12.6269° N, 80.1927° E (Mahabalipuram, TN)</p>
            </div>
          </div>
          <button
            onClick={handleShareLocation}
            className="px-3 py-1.5 rounded-xl bg-charcoal-800 hover:bg-charcoal-700 text-warmwhite-100 text-xs font-medium border border-white/10 flex items-center gap-1.5 transition-colors"
          >
            <Share2 className="w-3.5 h-3.5 text-terracotta-400" />
            <span>{locationShared ? 'Beacon Active!' : 'Share Beacon'}</span>
          </button>
        </div>

        {locationShared && (
          <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-xs text-emerald-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Encrypted location shared with designated emergency contacts & local police outpost.</span>
          </div>
        )}

        {actionDone && (
          <div className="p-3 rounded-xl bg-blue-500/20 border border-blue-500/40 text-xs text-blue-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-blue-400" />
            <span>Demo Dispatch Initiated: Contacting {actionDone}. Response coordinator notified.</span>
          </div>
        )}

        {/* Emergency Contacts List */}
        <div className="space-y-2.5">
          <p className="text-xs font-semibold text-warmwhite-300/70 uppercase tracking-wider">
            One-Tap Emergency Numbers
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {contacts.map((c) => {
              const Icon = c.icon;
              return (
                <button
                  key={c.name}
                  onClick={() => handleTriggerAction(`${c.name} (${c.number})`)}
                  className="p-3 rounded-xl bg-charcoal-850 hover:bg-charcoal-800 border border-white/10 hover:border-red-500/30 text-left transition-all flex items-start gap-3 group"
                >
                  <div className={`p-2 rounded-lg bg-charcoal-900 ${c.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-white group-hover:text-red-300 transition-colors">{c.name}</span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-charcoal-950 font-mono text-terracotta-400 border border-white/5 font-bold">
                        {c.number}
                      </span>
                    </div>
                    <p className="text-[10px] text-warmwhite-300/60 mt-0.5 line-clamp-1">{c.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Confirmation Modal Overlay */}
        {confirmAction && (
          <div className="p-4 rounded-2xl bg-red-950/90 border border-red-500/50 space-y-3 animate-in zoom-in-95">
            <p className="text-xs text-white font-semibold flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-red-400" />
              Confirm Emergency Action:
            </p>
            <p className="text-xs text-red-200">
              Are you sure you want to trigger <strong>{confirmAction}</strong>? This action will notify local emergency services in Tamil Nadu.
            </p>
            <div className="flex items-center gap-2 justify-end pt-1">
              <button
                onClick={() => setConfirmAction(null)}
                className="px-3 py-1.5 rounded-lg bg-charcoal-800 text-xs text-warmwhite-200 hover:bg-charcoal-700"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmExecute}
                className="px-4 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-xs font-bold text-white shadow-md"
              >
                Yes, Dispatch Alert
              </button>
            </div>
          </div>
        )}

        {/* Footer info */}
        <div className="text-center pt-2 text-[11px] text-warmwhite-300/50">
          Tamil Nadu Tourism Development Corporation (TTDC) 24/7 Safety Network
        </div>

      </div>
    </div>
  );
};
