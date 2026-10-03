import React, { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  emoji?: string;
  rotation: number;
  delay: number;
}

interface ConfettiEffectProps {
  active: boolean;
  onComplete?: () => void;
}

const COLORS = ['#F4C7D9', '#D87C9B', '#D9A441', '#FFF8F4', '#81C784', '#64B5F6', '#BA68C8'];
const EMOJIS = ['✨', '🌸', '💖', '⭐', '🎀'];

export const ConfettiEffect: React.FC<ConfettiEffectProps> = ({ active, onComplete }) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (!active) {
      setParticles([]);
      return;
    }

    const newParticles: Particle[] = Array.from({ length: 28 }).map((_, i) => ({
      id: i,
      x: Math.random() * 90 + 5, // percentage
      y: -10 - Math.random() * 20,
      size: Math.floor(Math.random() * 12) + 12,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      emoji: Math.random() > 0.4 ? EMOJIS[Math.floor(Math.random() * EMOJIS.length)] : undefined,
      rotation: Math.floor(Math.random() * 360),
      delay: Math.random() * 0.4,
    }));

    setParticles(newParticles);

    const timer = setTimeout(() => {
      setParticles([]);
      if (onComplete) onComplete();
    }, 2800);

    return () => clearTimeout(timer);
  }, [active, onComplete]);

  if (!active || particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute transition-transform duration-1000 ease-out"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            animation: `confetti-fall 2.5s ease-out ${p.delay}s forwards`,
          }}
        >
          {p.emoji ? (
            <span style={{ fontSize: `${p.size}px` }} className="drop-shadow-xs">
              {p.emoji}
            </span>
          ) : (
            <div
              style={{
                width: `${p.size * 0.7}px`,
                height: `${p.size * 0.7}px`,
                backgroundColor: p.color,
                transform: `rotate(${p.rotation}deg)`,
              }}
              className="rounded-sm shadow-xs"
            />
          )}
        </div>
      ))}
      <style>{`
        @keyframes confetti-fall {
          0% {
            transform: translateY(0) rotate(0deg) scale(0.6);
            opacity: 1;
          }
          50% {
            transform: translateY(45vh) rotate(180deg) scale(1.1);
            opacity: 0.9;
          }
          100% {
            transform: translateY(90vh) rotate(360deg) scale(0.7);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};
