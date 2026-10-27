import React, { useState } from 'react';
import { Volume2, Sparkles } from 'lucide-react';
import { ttsService } from '../services/ttsService';

interface BeMamMascotProps {
  mood?: 'happy' | 'thinking' | 'cheering' | 'speaking' | 'wave';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  message?: string;
  showSpeechBubble?: boolean;
  onMascotClick?: () => void;
  className?: string;
}

export const BeMamMascot: React.FC<BeMamMascotProps> = ({
  mood = 'happy',
  size = 'md',
  message,
  showSpeechBubble = false,
  onMascotClick,
  className = ''
}) => {
  const [isWiggling, setIsWiggling] = useState(false);

  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-20 h-20',
    lg: 'w-32 h-32',
    xl: 'w-44 h-44'
  };

  const handleClick = () => {
    setIsWiggling(true);
    setTimeout(() => setIsWiggling(false), 700);
    if (message) {
      ttsService.speak(message);
    } else {
      ttsService.speak('Chào bạn nhỏ! Mình là Bé Mầm AI, người bạn đồng hành của bạn!');
    }
    if (onMascotClick) onMascotClick();
  };

  return (
    <div className={`relative inline-flex items-center gap-3 ${className}`}>
      {/* Robot SVG Avatar */}
      <div
        onClick={handleClick}
        title="Nhấn vào Bé Mầm AI để nghe giọng nói!"
        className={`relative ${sizeClasses[size]} cursor-pointer select-none transition-transform duration-300 hover:scale-110 active:scale-95 ${
          isWiggling ? 'animate-bounce' : ''
        }`}
      >
        <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-md">
          <defs>
            {/* Body gradient: #246BFD to #8B5CF6 */}
            <linearGradient id="robotBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#246BFD" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>

            {/* Screen Face gradient */}
            <linearGradient id="faceGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#1e293b" />
            </linearGradient>

            {/* Sprout Leaf gradient */}
            <linearGradient id="sproutGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#34D399" />
              <stop offset="100%" stopColor="#10B981" />
            </linearGradient>

            {/* Gold Bell/Star glow */}
            <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FDE047" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>
          </defs>

          {/* Sprout on head (Mầm trí tuệ) */}
          <path
            d="M 80 32 Q 78 14 62 10 Q 74 6 82 22 Q 90 4 102 10 Q 86 16 82 32"
            fill="url(#sproutGrad)"
            stroke="#059669"
            strokeWidth="2"
          />
          {/* Sprout stem */}
          <path d="M 80 25 L 80 38" stroke="#10B981" strokeWidth="4" strokeLinecap="round" />
          {/* Glowing node on sprout */}
          <circle cx="80" cy="18" r="4" fill="#FBBF24" className="animate-pulse" />

          {/* Cute Robot Antenna earcups */}
          <rect x="18" y="60" width="12" height="26" rx="6" fill="#FBBF24" />
          <rect x="130" y="60" width="12" height="26" rx="6" fill="#FBBF24" />

          {/* Robot Head Body */}
          <rect
            x="26"
            y="35"
            width="108"
            height="86"
            rx="28"
            fill="url(#robotBodyGrad)"
            stroke="#1d4ed8"
            strokeWidth="3"
          />

          {/* Cute Face Screen */}
          <rect x="36" y="45" width="88" height="66" rx="20" fill="url(#faceGrad)" />

          {/* Big Sparkly Robot Eyes */}
          {mood === 'thinking' ? (
            // Thinking spiral eyes
            <>
              <circle cx="60" cy="74" r="10" fill="#38BDF8" />
              <circle cx="100" cy="74" r="10" fill="#38BDF8" />
              <path d="M 54 74 Q 60 66 66 74" stroke="#0284c7" strokeWidth="2" fill="none" />
              <path d="M 94 74 Q 100 66 106 74" stroke="#0284c7" strokeWidth="2" fill="none" />
            </>
          ) : mood === 'cheering' ? (
            // Curved happy cheering eyes ^^
            <>
              <path d="M 50 78 Q 60 64 70 78" stroke="#38BDF8" strokeWidth="5" strokeLinecap="round" fill="none" />
              <path d="M 90 78 Q 100 64 110 78" stroke="#38BDF8" strokeWidth="5" strokeLinecap="round" fill="none" />
            </>
          ) : (
            // Big open friendly eyes with reflection
            <>
              <ellipse cx="60" cy="75" rx="10" ry="12" fill="#38BDF8" />
              <circle cx="63" cy="71" r="4" fill="#ffffff" />
              <ellipse cx="100" cy="75" rx="10" ry="12" fill="#38BDF8" />
              <circle cx="103" cy="71" r="4" fill="#ffffff" />
            </>
          )}

          {/* Rosy Cheeks */}
          <circle cx="48" cy="88" r="6" fill="#F43F5E" opacity="0.6" />
          <circle cx="112" cy="88" r="6" fill="#F43F5E" opacity="0.6" />

          {/* Mouth */}
          {mood === 'speaking' ? (
            <ellipse cx="80" cy="90" rx="8" ry="6" fill="#FDE047" />
          ) : (
            <path
              d="M 72 88 Q 80 96 88 88"
              stroke="#FDE047"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />
          )}

          {/* Chest Collar / Badge */}
          <path d="M 65 121 L 95 121 L 88 138 L 72 138 Z" fill="url(#goldGrad)" />
          {/* Small star emblem on collar */}
          <circle cx="80" cy="129" r="3" fill="#ffffff" />

          {/* Cute Waving Arm */}
          {mood === 'wave' || mood === 'cheering' ? (
            <path
              d="M 124 92 C 145 80 148 60 142 55 C 136 50 128 72 120 86"
              fill="#246BFD"
              stroke="#1d4ed8"
              strokeWidth="2"
            />
          ) : null}
        </svg>

        {/* Floating AI sparkle badge */}
        <span className="absolute -top-1 -right-1 bg-amber-400 text-amber-950 p-1 rounded-full text-[10px] font-black shadow flex items-center justify-center">
          <Sparkles className="w-3 h-3" />
        </span>
      </div>

      {/* Interactive Speech Bubble */}
      {showSpeechBubble && message && (
        <div className="relative bg-white border-2 border-blue-400 rounded-2xl p-3 shadow-lg max-w-xs md:max-w-sm text-slate-800 text-sm animate-fade-in">
          <div className="absolute top-1/2 -left-2.5 -mt-2 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-blue-400" />
          <div className="flex items-start gap-2">
            <p className="font-semibold text-slate-800 leading-snug flex-1">{message}</p>
            <button
              onClick={() => ttsService.speak(message)}
              className="text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-50 transition-colors"
              title="Nghe Bé Mầm đọc"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
