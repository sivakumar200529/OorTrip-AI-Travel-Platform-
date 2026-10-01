import React from 'react';

interface TamilNaduLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export const TamilNaduLogo: React.FC<TamilNaduLogoProps> = ({ 
  className = '', 
  size = 40,
  showText = false
}) => {
  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      {/* Official Srivilliputhur Gopuram Emblem Vector */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform duration-300 hover:scale-105 filter drop-shadow(0 2px 8px rgba(211,91,45,0.35))"
      >
        <defs>
          <linearGradient id="tnGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FBBF24" />
            <stop offset="50%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>
          <linearGradient id="tnTerracotta" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EA580C" />
            <stop offset="100%" stopColor="#9A3412" />
          </linearGradient>
          <linearGradient id="tnCircle" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1E232A" />
            <stop offset="100%" stopColor="#0E1116" />
          </linearGradient>
        </defs>

        {/* Circular Outer Seal */}
        <circle cx="50" cy="50" r="47" fill="url(#tnCircle)" stroke="url(#tnGold)" strokeWidth="2.5" />
        <circle cx="50" cy="50" r="43" stroke="#FBBF24" strokeWidth="0.8" strokeDasharray="2 2" opacity="0.6" />

        {/* Ashoka Stambha / Lion Capital Crest at Apex */}
        <path
          d="M48 14h4v6h-4z M46 20h8v2h-8z M44 16l3-2h6l3 2v2h-12z"
          fill="url(#tnGold)"
        />

        {/* Srivilliputhur Andal Temple Gopuram Tiers */}
        {/* Tier 1 (Apex Kalasam) */}
        <polygon points="50,22 47,26 53,26" fill="#FBBF24" />
        <rect x="46" y="26" width="8" height="2" fill="url(#tnGold)" />

        {/* Tier 2 */}
        <polygon points="50,28 43,34 57,34" fill="url(#tnGold)" />
        <rect x="42" y="34" width="16" height="2.5" fill="#D97706" />

        {/* Tier 3 */}
        <polygon points="50,36.5 40,43 60,43" fill="url(#tnGold)" />
        <rect x="39" y="43" width="22" height="3" fill="#B45309" />

        {/* Tier 4 */}
        <polygon points="50,46 36,54 64,54" fill="url(#tnGold)" />
        <rect x="35" y="54" width="30" height="3" fill="#D97706" />

        {/* Tier 5 */}
        <polygon points="50,57 32,66 68,66" fill="url(#tnGold)" />
        <rect x="31" y="66" width="38" height="3.5" fill="#B45309" />

        {/* Temple Gate / Sanctum Portal (Dravidian Mandapam Base) */}
        <path
          d="M28 69.5h44v14H28z"
          fill="url(#tnTerracotta)"
        />
        {/* Arched Sanctum Doorway */}
        <path
          d="M44 83.5v-7.5a6 6 0 0 1 12 0v7.5z"
          fill="#0B0D10"
          stroke="#FBBF24"
          strokeWidth="1"
        />

        {/* Pillared Gateway Columns */}
        <rect x="33" y="70" width="3.5" height="13.5" fill="url(#tnGold)" />
        <rect x="63.5" y="70" width="3.5" height="13.5" fill="url(#tnGold)" />

        {/* Base Pedestal with Inscription Strip */}
        <rect x="22" y="83.5" width="56" height="4" rx="1" fill="url(#tnGold)" />

        {/* Inscription Ring - தமிழ் எழுத்து / Tamil Nadu Govt Motif */}
        <text
          x="50"
          y="93"
          textAnchor="middle"
          fontSize="4.5"
          fontWeight="bold"
          fill="#FDE68A"
          letterSpacing="0.5"
          fontFamily="system-ui, sans-serif"
        >
          தமிழ்நாடு அரசு
        </text>
      </svg>

      {/* Optional Companion Seal Typography */}
      {showText && (
        <div className="flex flex-col text-left leading-tight">
          <span className="text-[10px] font-bold text-sand-300 uppercase tracking-widest font-mono">
            தமிழ்நாடு அரசு
          </span>
          <span className="text-[11px] font-bold text-white tracking-wider">
            TAMIL NADU TOURISM
          </span>
        </div>
      )}
    </div>
  );
};
