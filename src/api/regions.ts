import type { Region } from '../types/region';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const RegionsAPI = {
  async getRegionsByWorldId(worldId: string): Promise<Region[]> {
    const response = await fetch(`${API_BASE_URL}/api/worlds/${worldId}/regions`);
    if (!response.ok) {
      throw new Error('Failed to fetch regions');
    }
    return response.json();
  }
}; 