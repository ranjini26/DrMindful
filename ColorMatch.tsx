import React, { useState, useEffect } from 'react';

const COLORS = ['red', 'blue', 'green', 'yellow'];

export function ColorMatch() {
  const [score, setScore] = useState(0);
  const [word, setWord] = useState('');
  const [color, setColor] = useState('');
  const [timeLeft, setTimeLeft] = useState(30);

  const generateNew = () => {
    const wordIndex = Math.floor(Math.random() * COLORS.length);
    const colorIndex = Math.floor(Math.random() * COLORS.length);
    setWord(COLORS[wordIndex]);
    setColor(COLORS[colorIndex]);
  };

  useEffect(() => {
    generateNew();
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleAnswer = (matches: boolean) => {
    const isCorrect = (word === color) === matches;
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
    generateNew();
  };

  return (
    <div className="flex flex-col items-center justify-center h-[400px] space-y-8">
      <div className="text-center">
        <p className="text-3xl font-bold mb-2">Score: {score}</p>
        <p className="text-xl">Time: {timeLeft}s</p>
      </div>
      
      <p className={`text-4xl font-bold text-${color}-500`}>{word}</p>

      <div className="flex gap-4">
        <button
          onClick={() => handleAnswer(true)}
          className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Match
        </button>
        <button
          onClick={() => handleAnswer(false)}
          className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          No Match
        </button>
      </div>
    </div>
  );
}