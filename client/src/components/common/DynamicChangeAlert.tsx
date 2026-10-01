import React from 'react';
import { AlertTriangle, Sparkles, Check, ArrowRight, X } from 'lucide-react';

interface DynamicChangeAlertProps {
  originalDestination: string;
  suggestedAlternative: string;
  reason: string;
  savingsOrAdvantage?: string;
  onAccept: () => void;
  onReject: () => void;
  isAccepted: boolean;
}

export const DynamicChangeAlert: React.FC<DynamicChangeAlertProps> = ({
  originalDestination,
  suggestedAlternative,
  reason,
  savingsOrAdvantage,
  onAccept,
  onReject,
  isAccepted
}) => {
  if (isAccepted) {
    return (
      <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-xs text-emerald-300 flex items-center justify-between animate-in fade-in duration-300 shadow-depth-sm">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <Check className="w-4 h-4" />
          </div>
          <div>
            <p className="font-bold text-white">Dynamic AI Route Updated!</p>
            <p className="text-[11px] text-emerald-300/80">
              Substituted <strong>{originalDestination}</strong> with <strong>{suggestedAlternative}</strong> to bypass heavy crowd delays.
            </p>
          </div>
        </div>

        <button
          onClick={onReject}
          className="px-3 py-1.5 rounded-lg bg-charcoal-800 hover:bg-charcoal-700 text-warmwhite-300 text-xs border border-white/10"
        >
          Revert to {originalDestination}
        </button>
      </div>
    );
  }

  return (
    <div className="relative rounded-2xl bg-gradient-to-r from-amber-950/80 via-charcoal-900 to-charcoal-900 border border-amber-500/40 p-4 sm:p-5 shadow-depth-md animate-in slide-in-from-top-2 duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0 mt-0.5 animate-pulse">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                AI DETECTED A CHANGE
              </span>
              <span className="text-[10px] text-warmwhite-300/50 font-mono">Real-time optimization</span>
            </div>
            <p className="text-xs font-semibold text-white">
              "{originalDestination} is currently experiencing peak crowd congestion."
            </p>
            <p className="text-xs text-sand-300">
              AI suggestion: <strong>Visit {suggestedAlternative} instead</strong> — {reason}
            </p>
            {savingsOrAdvantage && (
              <p className="text-[11px] text-emerald-400 font-medium">
                ✓ {savingsOrAdvantage}
              </p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 sm:self-center shrink-0">
          <button
            onClick={onReject}
            className="px-4 py-2 rounded-xl bg-charcoal-800 hover:bg-charcoal-700 text-warmwhite-300 text-xs font-semibold border border-white/10 transition-colors"
          >
            KEEP ORIGINAL
          </button>

          <button
            onClick={onAccept}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-terracotta-500 hover:from-amber-600 hover:to-terracotta-600 text-white text-xs font-bold shadow-md flex items-center gap-1.5 transition-all"
          >
            <span>ACCEPT</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
