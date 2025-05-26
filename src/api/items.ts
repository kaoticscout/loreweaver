import type { Item } from '../types/item';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const ItemsAPI = {
  async getItemsByWorldId(worldId: string): Promise<Item[]> {
    const response = await fetch(`${API_BASE_URL}/api/worlds/${worldId}/items`);
    if (!response.ok) {
      throw new Error('Failed to fetch items');
    }
    return response.json();
  },

  async getItemById(id: string): Promise<Item | null> {
    const response = await fetch(`${API_BASE_URL}/api/items/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch item');
    }
    return response.json();
  },

  async getItemsByCategory(worldId: string, category: string): Promise<Item[]> {
    const response = await fetch(`${API_BASE_URL}/api/worlds/${worldId}/items?category=${category}`);
    if (!response.ok) {
      throw new Error('Failed to fetch items by category');
    }
    return response.json();
  },

  async getItemsByRarity(worldId: string, rarity: string): Promise<Item[]> {
    const response = await fetch(`${API_BASE_URL}/api/worlds/${worldId}/items?rarity=${rarity}`);
    if (!response.ok) {
      throw new Error('Failed to fetch items by rarity');
    }
    return response.json();
  }
}; 