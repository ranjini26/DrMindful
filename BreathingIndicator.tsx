import React, { useState, useEffect } from 'react';

export function BreathingIndicator() {
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  
  useEffect(() => {
    const timer = setInterval(() => {
      setPhase(current => {
        switch (current) {
          case 'inhale': return 'hold';
          case 'hold': return 'exhale';
          case 'exhale': return 'inhale';
        }
      });
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative">
      <div
        className={`w-32 h-32 rounded-full transition-all duration-4000 ease-in-out flex items-center justify-center
          ${phase === 'inhale' ? 'bg-gradient-to-br from-blue-100 to-blue-200 scale-125' : ''}
          ${phase === 'hold' ? 'bg-gradient-to-br from-indigo-100 to-indigo-200 scale-100' : ''}
          ${phase === 'exhale' ? 'bg-gradient-to-br from-purple-100 to-purple-200 scale-75' : ''}
        `}
      >
        <div
          className={`absolute inset-0 rounded-full transition-opacity duration-1000
            ${phase === 'inhale' ? 'bg-blue-400 animate-pulse opacity-10' : ''}
            ${phase === 'hold' ? 'bg-indigo-400 animate-pulse opacity-10' : ''}
            ${phase === 'exhale' ? 'bg-purple-400 animate-pulse opacity-10' : ''}
          `}
        />
        <p className="relative text-gray-700 font-medium capitalize z-10">
          {phase}
        </p>
      </div>
    </div>
  );
}