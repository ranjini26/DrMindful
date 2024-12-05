import React, { useState, useEffect } from 'react';

export function BreathingGame() {
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [counter, setCounter] = useState(4);

  useEffect(() => {
    const timer = setInterval(() => {
      setCounter((prev) => {
        if (prev === 1) {
          switch (phase) {
            case 'inhale':
              setPhase('hold');
              return 7;
            case 'hold':
              setPhase('exhale');
              return 8;
            case 'exhale':
              setPhase('inhale');
              return 4;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [phase]);

  return (
    <div className="flex flex-col items-center justify-center h-[400px]">
      <div className={`w-48 h-48 rounded-full flex items-center justify-center transition-all duration-1000
        ${phase === 'inhale' ? 'bg-blue-100 scale-110' : ''}
        ${phase === 'hold' ? 'bg-green-100' : ''}
        ${phase === 'exhale' ? 'bg-purple-100 scale-90' : ''}
      `}>
        <div className="text-center">
          <p className="text-2xl font-semibold capitalize">{phase}</p>
          <p className="text-4xl font-bold">{counter}</p>
        </div>
      </div>
    </div>
  );
}