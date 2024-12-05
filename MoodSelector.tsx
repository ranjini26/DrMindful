import React from 'react';
import type { Mood } from '../types';

interface MoodSelectorProps {
  selectedMood: Mood | null;
  onMoodSelect: (mood: Mood) => void;
}

export function MoodSelector({ selectedMood, onMoodSelect }: MoodSelectorProps) {
  const moods: Mood[] = ['stressed', 'anxious', 'unfocused', 'tired', 'energetic'];

  return (
    <div className="flex flex-col items-center mb-8">
      <h2 className="text-2xl font-semibold mb-4">How are you feeling?</h2>
      <div className="flex gap-3">
        {moods.map((mood) => (
          <button
            key={mood}
            onClick={() => onMoodSelect(mood)}
            className={`px-4 py-2 rounded-full capitalize ${
              selectedMood === mood
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            {mood}
          </button>
        ))}
      </div>
    </div>
  );
}