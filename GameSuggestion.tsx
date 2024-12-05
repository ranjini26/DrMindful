import React from 'react';
import { Lightbulb, ArrowLeft } from 'lucide-react';
import type { Game, Mood } from '../types';

interface GameSuggestionProps {
  mood: Mood;
  games: Game[];
}

export function GameSuggestion({ mood, games }: GameSuggestionProps) {
  const moodMessages = {
    stressed: "I understand that stress can feel overwhelming. These activities are specifically chosen to help you find your center and create a moment of peace.",
    anxious: "When anxiety rises, it's important to ground ourselves. These games will guide you through calming exercises to help settle your mind.",
    unfocused: "It's perfectly normal for our mind to wander. These activities will gently guide you back to the present moment.",
    tired: "Taking care of yourself when tired is crucial. These gentle exercises will help revitalize your mind without overwhelming you.",
    energetic: "Your positive energy is wonderful! Let's channel it into meaningful activities that will maintain your uplifted spirit."
  };

  return (
    <div className="text-center mb-8">
      <div className="flex items-center justify-center mb-4">
        <Lightbulb className="w-6 h-6 text-indigo-600 mr-2" />
        <h2 className="text-2xl font-semibold">Your Personalized Mindful Journey</h2>
      </div>
      <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
        {moodMessages[mood]}
      </p>
      <div className="text-sm text-gray-500 mb-8">
        Each game is designed to take just a few minutes. Remember to breathe and stay present.
      </div>
    </div>
  );
}