import { BreathingGame } from './BreathingGame';
import { ColorMatch } from './ColorMatch';
import { MemoryTiles } from './MemoryTiles';
import { PatternDraw } from './PatternDraw';
import { MindfulSort } from './MindfulSort';
import type { Game } from '../types';

export const games: Game[] = [
  {
    id: 'breathing',
    title: 'Mindful Breathing',
    description: 'Follow the 4-7-8 breathing technique to calm your mind',
    duration: 60,
    moodTags: ['stressed', 'anxious'],
    component: BreathingGame
  },
  {
    id: 'color-match',
    title: 'Color Match',
    description: 'Test your focus by matching colors and words',
    duration: 30,
    moodTags: ['unfocused', 'tired', 'energetic'],
    component: ColorMatch
  },
  {
    id: 'memory-tiles',
    title: 'Memory Tiles',
    description: 'Remember and repeat the sequence of colored tiles',
    duration: 45,
    moodTags: ['unfocused', 'tired'],
    component: MemoryTiles
  },
  {
    id: 'pattern-draw',
    title: 'Pattern Draw',
    description: 'Draw calming patterns on a grid to practice mindfulness',
    duration: 60,
    moodTags: ['stressed', 'anxious', 'unfocused'],
    component: PatternDraw
  },
  {
    id: 'mindful-sort',
    title: 'Mindful Sort',
    description: 'Sort mindful words while practicing focus and calmness',
    duration: 30,
    moodTags: ['unfocused', 'energetic'],
    component: MindfulSort
  }
];