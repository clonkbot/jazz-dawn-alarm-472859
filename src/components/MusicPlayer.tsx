import { memo, useState, useEffect, useRef } from 'react';

interface MusicPlayerProps {
  lyrics: string;
  onStop: () => void;
}

const MusicPlayer = memo(function MusicPlayer({
  lyrics,
  onStop,
}: MusicPlayerProps) {
  const [timeRemaining, setTimeRemaining] = useState(5 * 60); // 5 minutes in seconds
  const [currentLyricIndex, setCurrentLyricIndex] = useState(0);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);

  const lyricLines = lyrics.split('\n').filter((line) => line.trim());

  // Jazz chord progression simulation using Web Audio API
  useEffect(() => {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioContextRef.current = new AudioContextClass();
    const ctx = audioContextRef.current;

    // Jazz chord frequencies (Cmaj7 - Dm7 - G7 - Cmaj7 progression)
    const chords = [
      [261.63, 329.63, 392.0, 493.88], // Cmaj7
      [293.66, 349.23, 440.0, 523.25], // Dm7
      [196.0, 246.94, 293.66, 349.23], // G7
      [261.63, 329.63, 392.0, 493.88], // Cmaj7
    ];

    let chordIndex = 0;

    const playChord = () => {
      if (!audioContextRef.current) return;

      // Stop previous oscillators
      oscillatorsRef.current.forEach((osc) => {
        try {
          osc.stop();
        } catch {
          // Oscillator already stopped
        }
      });
      oscillatorsRef.current = [];

      const chord = chords[chordIndex % chords.length];

      chord.forEach((freq) => {
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(freq, ctx.currentTime);

        // Soft volume for relaxing feel
        gainNode.gain.setValueAtTime(0, ctx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 0.5);
        gainNode.gain.linearRampToValueAtTime(0.03, ctx.currentTime + 2);
        gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + 3);

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        oscillator.start();
        oscillator.stop(ctx.currentTime + 3);

        oscillatorsRef.current.push(oscillator);
      });

      chordIndex++;
    };

    // Play initial chord
    playChord();

    // Play new chord every 3 seconds
    const chordInterval = setInterval(playChord, 3000);

    return () => {
      clearInterval(chordInterval);
      oscillatorsRef.current.forEach((osc) => {
        try {
          osc.stop();
        } catch {
          // Oscillator already stopped
        }
      });
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          onStop();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onStop]);

  // Cycle through lyrics
  useEffect(() => {
    if (lyricLines.length === 0) return;

    const lyricInterval = setInterval(() => {
      setCurrentLyricIndex((prev) => (prev + 1) % lyricLines.length);
    }, 5000);

    return () => clearInterval(lyricInterval);
  }, [lyricLines.length]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((5 * 60 - timeRemaining) / (5 * 60)) * 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2A1B3D] via-[#0D0D1A] to-[#1a1a2e]">
        {/* Pulsing circles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-[#C9A227]/10 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 md:w-96 md:h-96 bg-[#D4A574]/10 rounded-full blur-3xl animate-pulse-slow animation-delay-1000" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-2xl text-center space-y-8 md:space-y-12">
        {/* Music Visualizer */}
        <div className="flex items-end justify-center gap-1 md:gap-2 h-16 md:h-24">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="w-2 md:w-3 bg-gradient-to-t from-[#C9A227] to-[#D4A574] rounded-full animate-equalizer"
              style={{
                animationDelay: `${i * 0.1}s`,
                height: `${20 + Math.random() * 80}%`,
              }}
            />
          ))}
        </div>

        {/* Now Playing */}
        <div className="space-y-2">
          <p className="font-body text-sm text-[#C9A227] tracking-widest uppercase">
            Now Playing
          </p>
          <h2 className="font-display text-2xl md:text-4xl text-[#F5E6D3]">
            Morning Jazz
          </h2>
          <p className="font-body text-sm md:text-base text-[#D4A574]/60 italic">
            5 minutes of calm
          </p>
        </div>

        {/* Lyrics Display */}
        <div className="h-32 md:h-40 flex items-center justify-center overflow-hidden">
          <p
            key={currentLyricIndex}
            className="font-body text-lg md:text-2xl text-[#F5E6D3]/80 italic leading-relaxed max-w-lg animate-lyric-fade px-4"
          >
            "{lyricLines[currentLyricIndex] || ''}"
          </p>
        </div>

        {/* Progress Bar */}
        <div className="space-y-3 px-4 md:px-8">
          <div className="relative h-2 bg-[#F5E6D3]/10 rounded-full overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#C9A227] to-[#D4A574] rounded-full transition-all duration-1000"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between font-display text-sm text-[#D4A574]/60">
            <span>{formatTime(5 * 60 - timeRemaining)}</span>
            <span>{formatTime(timeRemaining)}</span>
          </div>
        </div>

        {/* Stop Button */}
        <button
          onClick={onStop}
          className="mx-auto px-12 py-4 bg-gradient-to-r from-[#C9A227] to-[#D4A574] rounded-full font-display text-base md:text-lg text-[#0D0D1A] tracking-wider hover:from-[#D4A574] hover:to-[#C9A227] transition-all shadow-[0_0_40px_rgba(201,162,39,0.4)] active:scale-95 min-h-[56px]"
        >
          Stop Alarm
        </button>
      </div>
    </div>
  );
});

export default MusicPlayer;
