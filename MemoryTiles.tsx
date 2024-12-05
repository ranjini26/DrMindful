import React, { useState, useEffect } from 'react';
import { Shuffle } from 'lucide-react';

const COLORS = ['bg-red-400', 'bg-blue-400', 'bg-green-400', 'bg-yellow-400', 'bg-purple-400', 'bg-pink-400'];

export function MemoryTiles() {
  const [sequence, setSequence] = useState<string[]>([]);
  const [playerSequence, setPlayerSequence] = useState<string[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const startNewRound = () => {
    const newColor = COLORS[Math.floor(Math.random() * COLORS.length)];
    const newSequence = [...sequence, newColor];
    setSequence(newSequence);
    playSequence(newSequence);
  };

  const playSequence = async (seq: string[]) => {
    setIsPlaying(true);
    setPlayerSequence([]);
    
    for (let color of seq) {
      await new Promise(resolve => setTimeout(resolve, 800));
      const tile = document.querySelector(`[data-color="${color}"]`);
      tile?.classList.add('opacity-100');
      await new Promise(resolve => setTimeout(resolve, 400));
      tile?.classList.remove('opacity-100');
    }
    
    setIsPlaying(false);
  };

  const handleTileClick = (color: string) => {
    if (isPlaying || gameOver) return;

    const newPlayerSequence = [...playerSequence, color];
    setPlayerSequence(newPlayerSequence);

    const currentIndex = playerSequence.length;
    if (color !== sequence[currentIndex]) {
      setGameOver(true);
      return;
    }

    if (newPlayerSequence.length === sequence.length) {
      setScore(score + 1);
      setTimeout(startNewRound, 1000);
    }
  };

  const startGame = () => {
    setSequence([]);
    setPlayerSequence([]);
    setScore(0);
    setGameOver(false);
    setTimeout(startNewRound, 1000);
  };

  return (
    <div className="flex flex-col items-center justify-center h-[400px] space-y-6">
      <div className="text-center mb-4">
        <p className="text-3xl font-bold">Score: {score}</p>
        {gameOver && <p className="text-red-500 mt-2">Game Over!</p>}
      </div>

      <div className="grid grid-cols-3 gap-4">
        {COLORS.map((color, index) => (
          <button
            key={color}
            data-color={color}
            onClick={() => handleTileClick(color)}
            disabled={isPlaying}
            className={`w-20 h-20 rounded-lg ${color} opacity-40 transition-opacity duration-200 hover:opacity-70`}
          />
        ))}
      </div>

      <button
        onClick={startGame}
        className="flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
      >
        <Shuffle className="w-5 h-5 mr-2" />
        {gameOver ? 'Play Again' : 'Start Game'}
      </button>
    </div>
  );
}