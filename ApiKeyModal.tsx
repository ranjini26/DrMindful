import React, { useState } from 'react';
import { Key, X } from 'lucide-react';

interface ApiKeyModalProps {
  onSubmit: (key: string) => void;
  onClose: () => void;
}

export function ApiKeyModal({ onSubmit, onClose }: ApiKeyModalProps) {
  const [apiKey, setApiKey] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      onSubmit(apiKey.trim());
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <Key className="w-6 h-6 text-indigo-600 mr-2" />
            <h2 className="text-xl font-semibold">Enter OpenAI API Key</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <p className="text-gray-600 mb-4">
          You've used all your free messages. To continue chatting, please enter your OpenAI API key.
          Your key will be used only in your browser and won't be stored on our servers.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="sk-..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Continue Chatting
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}