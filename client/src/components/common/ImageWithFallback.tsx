import React, { useState } from 'react';
import { Compass, Landmark, Mountain, Waves, Sparkles } from 'lucide-react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
  category?: string;
  label?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt = 'Tamil Nadu Destination',
  className = '',
  category,
  label,
  onError,
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Curated reliable fallback if the primary fails
  const backupSrc = 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80';

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (!hasError) {
      setHasError(true);
      // Attempt backup URL first if original failed
      const img = e.currentTarget;
      if (img.src !== backupSrc) {
        img.src = backupSrc;
        return;
      }
    }
    if (onError) onError(e);
  };

  const getCategoryIcon = () => {
    switch (category?.toLowerCase()) {
      case 'heritage':
      case 'temples':
        return <Landmark className="w-8 h-8 text-sand-300" />;
      case 'beaches':
        return <Waves className="w-8 h-8 text-ocean-300" />;
      case 'hill station':
      case 'nature':
        return <Mountain className="w-8 h-8 text-emerald-300" />;
      default:
        return <Compass className="w-8 h-8 text-terracotta-400" />;
    }
  };

  return (
    <div className={`relative overflow-hidden bg-charcoal-900 ${className}`}>
      {/* Background loading / fallback illustration */}
      {(!loaded || hasError) && (
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal-900 via-charcoal-850 to-charcoal-950 flex flex-col items-center justify-center p-4 text-center">
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 mb-2">
            {getCategoryIcon()}
          </div>
          <span className="text-xs font-serif text-sand-200 tracking-wider line-clamp-1">{label || alt}</span>
          <span className="text-[10px] text-warmwhite-300/60 font-sans mt-0.5">OorTrip AI Experience</span>
        </div>
      )}

      {/* Main image */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={handleError}
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          loaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        {...props}
      />
    </div>
  );
};
