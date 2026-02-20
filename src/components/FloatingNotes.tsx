import { memo } from 'react';

interface FloatingNotesProps {
  isPlaying: boolean;
}

const FloatingNotes = memo(function FloatingNotes({ isPlaying }: FloatingNotesProps) {
  const notes = ['♪', '♫', '♬', '♩', '♭', '♯'];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(isPlaying ? 20 : 8)].map((_, i) => (
        <div
          key={i}
          className={`absolute text-[#C9A227] animate-float-note ${
            isPlaying ? 'opacity-40' : 'opacity-20'
          }`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            fontSize: `${12 + Math.random() * 24}px`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${8 + Math.random() * 8}s`,
          }}
        >
          {notes[Math.floor(Math.random() * notes.length)]}
        </div>
      ))}
    </div>
  );
});

export default FloatingNotes;
