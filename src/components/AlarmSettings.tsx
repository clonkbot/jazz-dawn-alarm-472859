import { memo, useState } from 'react';
import type { AlarmState } from '../App';

interface AlarmSettingsProps {
  alarm: AlarmState;
  setAlarm: React.Dispatch<React.SetStateAction<AlarmState>>;
  customLyrics: string;
  setCustomLyrics: (lyrics: string) => void;
  onClose: () => void;
}

const AlarmSettings = memo(function AlarmSettings({
  alarm,
  setAlarm,
  customLyrics,
  setCustomLyrics,
  onClose,
}: AlarmSettingsProps) {
  const [hours, setHours] = useState(alarm.hours);
  const [minutes, setMinutes] = useState(alarm.minutes);
  const [lyrics, setLyrics] = useState(customLyrics);

  const handleSave = () => {
    setAlarm({
      hours,
      minutes,
      isSet: true,
      isRinging: false,
    });
    setCustomLyrics(lyrics);
    onClose();
  };

  const handleClear = () => {
    setAlarm({
      hours: 7,
      minutes: 0,
      isSet: false,
      isRinging: false,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#0D0D1A]/90 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-gradient-to-br from-[#1a1a2e] to-[#0D0D1A] rounded-2xl border border-[#C9A227]/30 shadow-[0_0_60px_rgba(212,165,116,0.1)] overflow-hidden animate-scale-in max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-[#C9A227]/20">
          <h2 className="font-display text-2xl md:text-3xl text-[#D4A574] text-center tracking-wide">
            Set Your Jazz Alarm
          </h2>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Time Picker */}
          <div className="space-y-3">
            <label className="font-body text-sm text-[#F5E6D3]/60 tracking-wider uppercase">
              Wake Up Time
            </label>
            <div className="flex items-center justify-center gap-4">
              <div className="relative">
                <select
                  value={hours}
                  onChange={(e) => setHours(parseInt(e.target.value))}
                  className="appearance-none w-24 md:w-28 h-16 md:h-20 bg-[#0D0D1A] border-2 border-[#C9A227]/40 rounded-xl text-center font-display text-2xl md:text-3xl text-[#F5E6D3] focus:border-[#C9A227] focus:outline-none transition-colors cursor-pointer"
                >
                  {[...Array(24)].map((_, i) => (
                    <option key={i} value={i}>
                      {i.toString().padStart(2, '0')}
                    </option>
                  ))}
                </select>
                <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 font-body text-xs text-[#D4A574]/60">
                  Hour
                </span>
              </div>

              <span className="font-display text-3xl md:text-4xl text-[#C9A227] animate-pulse">
                :
              </span>

              <div className="relative">
                <select
                  value={minutes}
                  onChange={(e) => setMinutes(parseInt(e.target.value))}
                  className="appearance-none w-24 md:w-28 h-16 md:h-20 bg-[#0D0D1A] border-2 border-[#C9A227]/40 rounded-xl text-center font-display text-2xl md:text-3xl text-[#F5E6D3] focus:border-[#C9A227] focus:outline-none transition-colors cursor-pointer"
                >
                  {[...Array(60)].map((_, i) => (
                    <option key={i} value={i}>
                      {i.toString().padStart(2, '0')}
                    </option>
                  ))}
                </select>
                <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 font-body text-xs text-[#D4A574]/60">
                  Minute
                </span>
              </div>
            </div>
          </div>

          {/* Lyrics Input */}
          <div className="space-y-3 mt-8">
            <label className="font-body text-sm text-[#F5E6D3]/60 tracking-wider uppercase">
              Custom Relaxing Lyrics
            </label>
            <textarea
              value={lyrics}
              onChange={(e) => setLyrics(e.target.value)}
              rows={8}
              className="w-full bg-[#0D0D1A] border-2 border-[#C9A227]/40 rounded-xl p-4 font-body text-sm md:text-base text-[#F5E6D3] leading-relaxed placeholder-[#F5E6D3]/30 focus:border-[#C9A227] focus:outline-none transition-colors resize-none"
              placeholder="Enter your calming lyrics here..."
            />
            <p className="font-body text-xs text-[#D4A574]/50 italic">
              These lyrics will appear during your 5-minute jazz wake-up
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-[#C9A227]/20 flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleClear}
            className="flex-1 px-6 py-3 bg-transparent border border-[#D4A574]/30 rounded-xl font-display text-sm text-[#D4A574]/70 tracking-wider hover:border-[#D4A574]/60 hover:text-[#D4A574] transition-all min-h-[44px]"
          >
            Clear Alarm
          </button>
          <button
            onClick={handleSave}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-[#C9A227] to-[#D4A574] rounded-xl font-display text-sm text-[#0D0D1A] tracking-wider hover:from-[#D4A574] hover:to-[#C9A227] transition-all shadow-[0_0_20px_rgba(201,162,39,0.3)] min-h-[44px]"
          >
            Save Alarm
          </button>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-[#D4A574]/60 hover:text-[#D4A574] transition-colors"
          aria-label="Close"
        >
          <svg
            viewBox="0 0 24 24"
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
});

export default AlarmSettings;
