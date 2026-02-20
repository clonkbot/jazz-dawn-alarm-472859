import { memo } from 'react';
import type { AlarmState } from '../App';

interface AlarmClockProps {
  currentTime: Date;
  alarm: AlarmState;
  onToggleSettings: () => void;
}

const AlarmClock = memo(function AlarmClock({
  currentTime,
  alarm,
  onToggleSettings,
}: AlarmClockProps) {
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const seconds = currentTime.getSeconds();

  const hourDegrees = (hours % 12) * 30 + minutes * 0.5;
  const minuteDegrees = minutes * 6 + seconds * 0.1;
  const secondDegrees = seconds * 6;

  const formatTime = (h: number, m: number) => {
    const period = h >= 12 ? 'PM' : 'AM';
    const displayHours = h % 12 || 12;
    return `${displayHours}:${m.toString().padStart(2, '0')} ${period}`;
  };

  return (
    <div className="relative animate-scale-in">
      {/* Clock Container */}
      <div
        className={`relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full
        bg-gradient-to-br from-[#1a1a2e] to-[#0D0D1A]
        shadow-[0_0_60px_rgba(212,165,116,0.15),inset_0_0_30px_rgba(0,0,0,0.5)]
        border-4 border-[#C9A227]/30
        ${alarm.isRinging ? 'animate-pulse-glow' : ''}`}
      >
        {/* Art Deco Inner Ring */}
        <div className="absolute inset-4 md:inset-6 rounded-full border-2 border-[#D4A574]/20" />
        <div className="absolute inset-8 md:inset-10 rounded-full border border-[#C9A227]/10" />

        {/* Hour Markers */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-full h-full"
            style={{ transform: `rotate(${i * 30}deg)` }}
          >
            <div
              className={`absolute top-3 md:top-4 left-1/2 -translate-x-1/2
              ${i % 3 === 0 ? 'w-1 h-4 md:h-5 bg-[#C9A227]' : 'w-0.5 h-2 md:h-3 bg-[#D4A574]/50'}`}
            />
          </div>
        ))}

        {/* Clock Numbers */}
        {[12, 3, 6, 9].map((num) => {
          const positions: Record<number, string> = {
            12: 'top-6 md:top-8 left-1/2 -translate-x-1/2',
            3: 'right-5 md:right-7 top-1/2 -translate-y-1/2',
            6: 'bottom-6 md:bottom-8 left-1/2 -translate-x-1/2',
            9: 'left-5 md:left-7 top-1/2 -translate-y-1/2',
          };
          return (
            <span
              key={num}
              className={`absolute font-display text-lg md:text-xl text-[#C9A227] ${positions[num]}`}
            >
              {num}
            </span>
          );
        })}

        {/* Hour Hand */}
        <div
          className="absolute top-1/2 left-1/2 w-1.5 md:w-2 h-16 md:h-20 lg:h-24 -ml-0.75 md:-ml-1 origin-bottom rounded-full bg-gradient-to-t from-[#C9A227] to-[#D4A574] shadow-lg"
          style={{
            transform: `translateY(-100%) rotate(${hourDegrees}deg)`,
          }}
        />

        {/* Minute Hand */}
        <div
          className="absolute top-1/2 left-1/2 w-1 md:w-1.5 h-20 md:h-28 lg:h-32 -ml-0.5 md:-ml-0.75 origin-bottom rounded-full bg-gradient-to-t from-[#D4A574] to-[#F5E6D3] shadow-lg"
          style={{
            transform: `translateY(-100%) rotate(${minuteDegrees}deg)`,
          }}
        />

        {/* Second Hand */}
        <div
          className="absolute top-1/2 left-1/2 w-0.5 h-24 md:h-32 lg:h-36 origin-bottom rounded-full bg-[#C9A227] shadow-lg transition-transform"
          style={{
            transform: `translateX(-50%) translateY(-100%) rotate(${secondDegrees}deg)`,
          }}
        />

        {/* Center Dot */}
        <div className="absolute top-1/2 left-1/2 w-4 h-4 md:w-5 md:h-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C9A227] shadow-lg border-2 border-[#D4A574]" />

        {/* Saxophone Icon Decoration */}
        <div className="absolute bottom-16 md:bottom-20 left-1/2 -translate-x-1/2">
          <svg
            viewBox="0 0 24 24"
            className="w-6 h-6 md:w-8 md:h-8 text-[#C9A227]/40"
            fill="currentColor"
          >
            <path d="M20.84 14.12c-.42.13-.85.21-1.29.21-2.21 0-4-1.79-4-4V5c0-.55-.45-1-1-1s-1 .45-1 1v5.33c0 2.21-1.79 4-4 4-.44 0-.87-.08-1.29-.21l-.22.22c-.39.39-.39 1.02 0 1.41l1.88 1.88c.39.39 1.02.39 1.41 0l.22-.22c.42.13.85.21 1.29.21 2.21 0 4-1.79 4-4V10c0-.55.45-1 1-1s1 .45 1 1v.33c0 2.21 1.79 4 4 4 .44 0 .87-.08 1.29-.21l.22.22c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41l-.22-.22c-.13-.41-.21-.84-.21-1.28 0-2.21 1.79-4 4-4V6c-3.31 0-6 2.69-6 6 0 .44.08.87.21 1.29l-.22.22c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0l.22-.22c.42.13.85.21 1.29.21 2.21 0 4-1.79 4-4z" />
          </svg>
        </div>
      </div>

      {/* Digital Time Display */}
      <div className="mt-6 md:mt-8 text-center">
        <p className="font-display text-2xl md:text-3xl lg:text-4xl text-[#F5E6D3] tracking-widest">
          {formatTime(hours, minutes)}
        </p>
        {alarm.isSet && !alarm.isRinging && (
          <p className="mt-2 font-body text-sm text-[#C9A227] animate-pulse">
            Alarm set for {formatTime(alarm.hours, alarm.minutes)}
          </p>
        )}
      </div>

      {/* Settings Button */}
      <button
        onClick={onToggleSettings}
        className="mt-6 md:mt-8 mx-auto block px-8 py-3 md:px-10 md:py-4
        bg-gradient-to-r from-[#C9A227]/20 to-[#D4A574]/20
        border border-[#C9A227]/50 rounded-full
        font-display text-sm md:text-base text-[#D4A574] tracking-wider
        hover:from-[#C9A227]/30 hover:to-[#D4A574]/30
        hover:border-[#C9A227]
        transition-all duration-300 ease-out
        shadow-[0_0_20px_rgba(201,162,39,0.1)]
        hover:shadow-[0_0_30px_rgba(201,162,39,0.2)]
        active:scale-95 min-h-[44px]"
      >
        {alarm.isSet ? 'Edit Alarm' : 'Set Alarm'}
      </button>
    </div>
  );
});

export default AlarmClock;
