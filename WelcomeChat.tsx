import React, { useState, useEffect } from 'react';
import { MessageSquare, Sparkles, Heart, Smile, Cloud, Stars } from 'lucide-react';
import type { Mood } from '../types';
import { BreathingIndicator } from './BreathingIndicator';
import { ApiKeyModal } from './ApiKeyModal';
import { chatService } from '../services/chatService';

interface WelcomeChatProps {
  onMoodSelect: (mood: Mood) => void;
}

export function WelcomeChat({ onMoodSelect }: WelcomeChatProps) {
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [response, setResponse] = useState('');
  const [showTherapistResponse, setShowTherapistResponse] = useState(false);
  const [showBreathingExercise, setShowBreathingExercise] = useState(false);
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [remainingMessages, setRemainingMessages] = useState(5);
  const [isTyping, setIsTyping] = useState(false);

  const questions = [
    {
      text: "Welcome to your mindful space. I'm Dr. Mindful, and I'm here to guide you through a moment of peace. What's your name?",
      input: true,
      placeholder: "Enter your name...",
      action: (value: string) => setName(value)
    },
    {
      text: (name: string) => `${name}, it's wonderful to meet you. This is a safe space for you to share. How are you feeling right now? Take your time to express yourself.`,
      input: true,
      placeholder: "Share your feelings...",
      action: (value: string) => setResponse(value)
    }
  ];

  const handleApiKeySubmit = (key: string) => {
    chatService.setApiKey(key);
    setShowApiKeyModal(false);
    processResponse(response);
  };

  const processResponse = async (value: string) => {
    try {
      setIsTyping(true);
      const result = await chatService.processMessage(value);
      setResponse(value);
      setShowTherapistResponse(true);
      setRemainingMessages(chatService.getRemainingMessages());
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      setShowBreathingExercise(true);
      setIsTyping(false);
      
      await new Promise(resolve => setTimeout(resolve, 5000));
      
      if (result.mood) {
        setTimeout(() => onMoodSelect(result.mood!), 2000);
      }
    } catch (error) {
      if (error instanceof Error && error.message === 'API_KEY_REQUIRED') {
        setShowApiKeyModal(true);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const input = (e.target as HTMLFormElement).elements.namedItem('chat-input') as HTMLInputElement;
    const value = input.value.trim();
    
    if (!value) return;
    input.value = '';

    if (step === questions.length - 1) {
      await processResponse(value);
    } else {
      questions[step].action(value);
      setStep(step + 1);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-gradient-to-b from-white to-indigo-50 rounded-2xl shadow-xl p-8 border border-indigo-100">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <div className="bg-rose-100 p-2 rounded-lg">
              <Heart className="w-8 h-8 text-rose-600" />
            </div>
            <div className="ml-4">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-rose-600 text-transparent bg-clip-text">
                Mindful Moments
              </h2>
              <p className="text-gray-600 text-sm">with Dr. Mindful</p>
            </div>
          </div>
          {remainingMessages < Infinity && (
            <div className="bg-indigo-50 px-3 py-1 rounded-full text-sm text-indigo-600 font-medium">
              {remainingMessages} free messages left
            </div>
          )}
        </div>

        <div className="space-y-6 mb-8">
          <div className="flex items-start">
            <div className="bg-indigo-100 p-2 rounded-lg flex-shrink-0">
              <MessageSquare className="w-5 h-5 text-indigo-600" />
            </div>
            <div className="ml-4 bg-white rounded-2xl p-4 shadow-sm flex-grow">
              <p className="text-gray-800 text-lg leading-relaxed">
                {typeof questions[step].text === 'function' 
                  ? questions[step].text(name)
                  : questions[step].text}
              </p>
              {step === 0 && (
                <div className="mt-3 flex items-center text-sm text-indigo-600">
                  <Cloud className="w-4 h-4 mr-1" />
                  <span>Take a deep breath before continuing...</span>
                </div>
              )}
            </div>
          </div>

          {response && showTherapistResponse && (
            <div className="flex items-start animate-fade-in">
              <div className="bg-rose-100 p-2 rounded-lg flex-shrink-0">
                <Sparkles className="w-5 h-5 text-rose-600" />
              </div>
              <div className="ml-4 bg-white rounded-2xl p-4 shadow-sm flex-grow">
                <p className="text-gray-800 leading-relaxed">{response}</p>
              </div>
            </div>
          )}

          {isTyping && (
            <div className="flex items-center space-x-2 ml-14">
              <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          )}

          {showBreathingExercise && (
            <div className="flex flex-col items-center space-y-4 py-6 animate-fade-in">
              <div className="bg-indigo-50 p-6 rounded-2xl">
                <BreathingIndicator />
              </div>
              <p className="text-sm text-gray-600 flex items-center">
                <Stars className="w-4 h-4 mr-2" />
                Let's take a moment to breathe together...
              </p>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="flex gap-3">
          <input
            type="text"
            name="chat-input"
            placeholder={questions[step].placeholder}
            className="flex-1 px-4 py-3 bg-white border border-indigo-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-lg shadow-sm"
            autoFocus
          />
          <button
            type="submit"
            className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-xl hover:from-indigo-700 hover:to-indigo-800 transition-all duration-200 flex items-center shadow-sm hover:shadow-md"
          >
            <Smile className="w-5 h-5 mr-2" />
            Share
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            This is a safe space for mindfulness practice. While we're here to support your well-being,
            please remember this is not a substitute for professional mental health care.
          </p>
        </div>
      </div>

      {showApiKeyModal && (
        <ApiKeyModal
          onSubmit={handleApiKeySubmit}
          onClose={() => setShowApiKeyModal(false)}
        />
      )}
    </div>
  );
}