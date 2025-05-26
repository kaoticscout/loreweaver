import type { World } from '../types/world';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const WorldsAPI = {
  async getAllWorlds(): Promise<World[]> {
    const response = await fetch(`${API_BASE_URL}/api/worlds`);
    if (!response.ok) {
      throw new Error('Failed to fetch worlds');
    }
    return response.json();
  },

  async getWorldById(id: string): Promise<World | null> {
    const response = await fetch(`${API_BASE_URL}/api/worlds/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch world');
    }
    return response.json();
  },

  async getWorldsByTheme(theme: string): Promise<World[]> {
    const response = await fetch(`${API_BASE_URL}/api/worlds?theme=${theme}`);
    if (!response.ok) {
      throw new Error('Failed to fetch worlds by theme');
    }
    return response.json();
  },

  async getFeaturedWorlds(): Promise<World[]> {
    const response = await fetch(`${API_BASE_URL}/api/worlds/featured`);
    if (!response.ok) {
      throw new Error('Failed to fetch featured worlds');
    }
    return response.json();
  }
}; 