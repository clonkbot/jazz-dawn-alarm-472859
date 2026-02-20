import { useState, useEffect, useCallback, useRef } from 'react';
import AlarmClock from './components/AlarmClock';
import AlarmSettings from './components/AlarmSettings';
import MusicPlayer from './components/MusicPlayer';
import FloatingNotes from './components/FloatingNotes';

export interface AlarmState {
  hours: number;
  minutes: number;
  isSet: boolean;
  isRinging: boolean;
}

const defaultLyrics = `The morning light is soft and slow,
A gentle breeze begins to flow.
The world awakens, fresh and new,
A peaceful dawn, just me and you.

Close your eyes and breathe so deep,
Let go of dreams from tender sleep.
The coffee's warm, the air is sweet,
Another day, another beat.

No rush, no worry, take your time,
The universe unfolds in rhyme.
Each breath you take, a gift so rare,
Float gently through the morning air.

The birds outside sing soft and low,
As golden rays begin to glow.
Rise up slowly, stretch and smile,
Stay in this moment for a while.`;

function App() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [alarm, setAlarm] = useState<AlarmState>({
    hours: 7,
    minutes: 0,
    isSet: false,
    isRinging: false,
  });
  const [customLyrics, setCustomLyrics] = useState(defaultLyrics);
  const [showSettings, setShowSettings] = useState(false);
  const alarmCheckRef = useRef(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!alarm.isSet || alarm.isRinging) return;

    const now = currentTime;
    const alarmHours = alarm.hours;
    const alarmMinutes = alarm.minutes;

    if (
      now.getHours() === alarmHours &&
      now.getMinutes() === alarmMinutes &&
      now.getSeconds() === 0 &&
      !alarmCheckRef.current
    ) {
      alarmCheckRef.current = true;
      setAlarm((prev) => ({ ...prev, isRinging: true }));
      setTimeout(() => {
        alarmCheckRef.current = false;
      }, 2000);
    }
  }, [currentTime, alarm.isSet, alarm.isRinging, alarm.hours, alarm.minutes]);

  const stopAlarm = useCallback(() => {
    setAlarm((prev) => ({ ...prev, isRinging: false, isSet: false }));
  }, []);

  const toggleSettings = useCallback(() => {
    setShowSettings((prev) => !prev);
  }, []);

  return (
    <div className="min-h-screen bg-[#0D0D1A] relative overflow-hidden flex flex-col">
      {/* Ambient Background */}
      <div className="absolute inset-0 bg-gradient-radial from-[#2A1B3D] via-[#0D0D1A] to-[#0D0D1A] opacity-60" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] opacity-30" />

      <FloatingNotes isPlaying={alarm.isRinging} />

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-8 md:py-12">
        <header className="text-center mb-6 md:mb-10 animate-fade-in">
          <h1 className="font-display text-3xl md:text-5xl lg:text-6xl text-[#D4A574] tracking-wide mb-2">
            Jazz Dawn
          </h1>
          <p className="font-body text-sm md:text-base text-[#F5E6D3]/60 italic tracking-wider">
            Wake up to the rhythm of serenity
          </p>
        </header>

        <AlarmClock
          currentTime={currentTime}
          alarm={alarm}
          onToggleSettings={toggleSettings}
        />

        {showSettings && (
          <AlarmSettings
            alarm={alarm}
            setAlarm={setAlarm}
            customLyrics={customLyrics}
            setCustomLyrics={setCustomLyrics}
            onClose={toggleSettings}
          />
        )}

        {alarm.isRinging && (
          <MusicPlayer
            lyrics={customLyrics}
            onStop={stopAlarm}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 pb-4 pt-2">
        <p className="text-center text-[#F5E6D3]/30 text-xs font-body tracking-wide">
          Requested by @stringer_kade · Built by @clonkbot
        </p>
      </footer>
    </div>
  );
}

export default App;
