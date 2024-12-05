import React, { useState, useEffect } from 'react';
import { MoveVertical } from 'lucide-react';

const INITIAL_ITEMS = [
  { id: 1, value: 'Gratitude', color: 'bg-blue-100' },
  { id: 2, value: 'Peace', color: 'bg-green-100' },
  { id: 3, value: 'Joy', color: 'bg-yellow-100' },
  { id: 4, value: 'Love', color: 'bg-pink-100' },
  { id: 5, value: 'Hope', color: 'bg-purple-100' }
];

export function MindfulSort() {
  const [items, setItems] = useState(INITIAL_ITEMS);
  const [draggedItem, setDraggedItem] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    shuffleItems();
  }, []);

  const shuffleItems = () => {
    setItems([...items].sort(() => Math.random() - 0.5));
    setIsCorrect(null);
  };

  const handleDragStart = (id: number) => {
    setDraggedItem(id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (targetId: number) => {
    if (draggedItem === null) return;

    const newItems = [...items];
    const draggedIndex = items.findIndex(item => item.id === draggedItem);
    const targetIndex = items.findIndex(item => item.id === targetId);

    [newItems[draggedIndex], newItems[targetIndex]] = [newItems[targetIndex], newItems[draggedIndex]];
    
    setItems(newItems);
    setDraggedItem(null);
    setAttempts(attempts + 1);

    // Check if sorted alphabetically
    const isSorted = newItems.every((item, index) => 
      index === 0 || item.value >= newItems[index - 1].value
    );
    setIsCorrect(isSorted);
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      <div className="text-center">
        <p className="text-lg mb-2">Sort these mindful words alphabetically</p>
        <p className="text-sm text-gray-600">Attempts: {attempts}</p>
      </div>

      <div className="space-y-2">
        {items.map((item) => (
          <div
            key={item.id}
            draggable
            onDragStart={() => handleDragStart(item.id)}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(item.id)}
            className={`${item.color} p-4 rounded-lg cursor-move flex items-center justify-between
              ${draggedItem === item.id ? 'opacity-50' : 'opacity-100'}
              transition-all duration-200`}
          >
            <span className="text-lg font-medium">{item.value}</span>
            <MoveVertical className="w-5 h-5 text-gray-500" />
          </div>
        ))}
      </div>

      {isCorrect !== null && (
        <div className={`text-center ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
          {isCorrect ? 'Perfect! Well done!' : 'Not quite right, keep trying!'}
        </div>
      )}

      <button
        onClick={shuffleItems}
        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
      >
        Shuffle Words
      </button>
    </div>
  );
}