import React, { useState } from 'react';
import { Brain } from 'lucide-react';
import { WelcomeChat } from './components/WelcomeChat';
import { GameSuggestion } from './components/GameSuggestion';
import { GameCard } from './components/GameCard';
import { games } from './games';
import type { Game, Mood } from './types';

export default function App() {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [activeGame, setActiveGame] = useState<Game | null>(null);

  const filteredGames = selectedMood
    ? games.filter((game) => game.moodTags.includes(selectedMood))
    : [];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <Brain className="w-8 h-8 text-indigo-600 mr-3" />
            <h1 className="text-2xl font-bold text-gray-900">Mindful Microgames</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {activeGame ? (
          <div className="max-w-2xl mx-auto">
            <button
              onClick={() => setActiveGame(null)}
              className="mb-6 text-gray-600 hover:text-gray-900"
            >
              ← Back to games
            </button>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">{activeGame.title}</h2>
              <activeGame.component />
            </div>
          </div>
        ) : selectedMood ? (
          <>
            <GameSuggestion mood={selectedMood} games={filteredGames} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGames.map((game) => (
                <GameCard
                  key={game.id}
                  game={game}
                  onPlay={setActiveGame}
                />
              ))}
            </div>
          </>
        ) : (
          <WelcomeChat onMoodSelect={setSelectedMood} />
        )}
      </main>
    </div>
  );
}