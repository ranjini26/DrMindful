import type { Mood } from '../types';

interface ChatState {
  messageCount: number;
  apiKey: string | null;
}

const MAX_FREE_MESSAGES = 5;

class ChatService {
  private state: ChatState = {
    messageCount: 0,
    apiKey: null
  };

  async processMessage(message: string): Promise<{ response: string; mood?: Mood }> {
    this.state.messageCount++;

    if (this.state.messageCount > MAX_FREE_MESSAGES && !this.state.apiKey) {
      throw new Error('API_KEY_REQUIRED');
    }

    // For now, use the existing logic for responses and mood detection
    return {
      response: this.getTherapistResponse(message),
      mood: this.analyzeMood(message)
    };
  }

  setApiKey(key: string) {
    this.state.apiKey = key;
  }

  getRemainingMessages(): number {
    if (this.state.apiKey) return Infinity;
    return Math.max(0, MAX_FREE_MESSAGES - this.state.messageCount);
  }

  private getTherapistResponse(feeling: string): string {
    const lowerFeeling = feeling.toLowerCase();
    if (lowerFeeling.includes('stress') || lowerFeeling.includes('overwhelm')) {
      return "I hear the weight of stress in your words, and I want you to know that it's completely natural to feel this way. You've already taken a positive step by acknowledging these feelings. Let's find some peaceful activities to help you create a moment of calm.";
    } else if (lowerFeeling.includes('anxi') || lowerFeeling.includes('worry')) {
      return "Anxiety can feel like waves washing over us, but remember that you're not alone in this journey. I'm here to help you find your anchor. Together, we'll explore some gentle activities that can help ground you in the present moment.";
    } else if (lowerFeeling.includes('tired') || lowerFeeling.includes('exhaust')) {
      return "I understand that fatigue can make everything feel more challenging. Your body and mind are asking for care and attention. Let's find some activities that can help restore your energy while being gentle with yourself.";
    } else if (lowerFeeling.includes('happy') || lowerFeeling.includes('good')) {
      return "It's wonderful to hear that positivity in your words! Your current state of mind is like fertile soil - perfect for cultivating even more mindfulness and joy. Let's channel this energy into meaningful activities that will help maintain and deepen this positive state.";
    }
    return "Thank you for sharing so openly. Being aware of our emotions, whatever they may be, is the first step toward mindfulness. I'm here to help you explore activities that will resonate with where you are right now.";
  }

  private analyzeMood(response: string): Mood {
    const keywords = {
      stressed: ['stress', 'overwhelm', 'pressure', 'tense', 'burden', 'heavy'],
      anxious: ['anxi', 'worry', 'nervous', 'fear', 'panic', 'uneasy', 'restless'],
      unfocused: ['distract', 'scatter', 'unfocus', 'concentrate', 'lost', 'confused'],
      tired: ['tired', 'exhaust', 'sleepy', 'fatigue', 'drain', 'low energy'],
      energetic: ['energy', 'excit', 'happy', 'good', 'great', 'wonderful', 'positive']
    };

    for (const [mood, words] of Object.entries(keywords)) {
      if (words.some(word => response.toLowerCase().includes(word))) {
        return mood as Mood;
      }
    }
    
    return 'unfocused';
  }
}

export const chatService = new ChatService();