import React from 'react';
import { Timer, Play } from 'lucide-react';
import type { Game } from '../types';

interface GameCardProps {
  game: Game;
  onPlay: (game: Game) => void;
}

export function GameCard({ game, onPlay }: GameCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-semibold mb-2">{game.title}</h3>
      <p className="text-gray-600 mb-4">{game.description}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center text-gray-500">
          <Timer className="w-4 h-4 mr-1" />
          <span>{game.duration}s</span>
        </div>
        <button
          onClick={() => onPlay(game)}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
        >
          <Play className="w-4 h-4 mr-2" />
          Play
        </button>
      </div>
    </div>
  );
}