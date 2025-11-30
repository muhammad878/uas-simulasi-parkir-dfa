import { useEffect, useState } from 'react';

interface ConfettiPiece {
  id: number;
  left: number;
  delay: number;
  duration: number;
  color: string;
}

function Confetti() {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    const colors = [
      '#10b981', // emerald
      '#3b82f6', // blue
      '#f59e0b', // amber
      '#8b5cf6', // purple
      '#ec4899', // pink
      '#06b6d4', // cyan
    ];

    const confettiPieces: ConfettiPiece[] = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.5,
      duration: 2 + Math.random() * 2,
      color: colors[Math.floor(Math.random() * colors.length)]
    }));

    setPieces(confettiPieces);

    // Clean up after animation
    const timer = setTimeout(() => {
      setPieces([]);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  if (pieces.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className="absolute top-0 w-2 h-2 rounded-sm animate-confetti"
          style={{
            left: `${piece.left}%`,
            backgroundColor: piece.color,
            animationDelay: `${piece.delay}s`,
            animationDuration: `${piece.duration}s`,
            boxShadow: `0 0 10px ${piece.color}`
          }}
        />
      ))}
    </div>
  );
}

export default Confetti;

