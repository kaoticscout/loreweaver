import type { World } from '../types/world';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
};

export const WorldsAPI = {
  async getAllWorlds(): Promise<World[]> {
    const response = await fetch(`${API_BASE_URL}/api/worlds`, {
      headers: getAuthHeaders()
    });
    if (!response.ok) {
      throw new Error('Failed to fetch worlds');
    }
    return response.json();
  },

  async getWorldById(id: string): Promise<World | null> {
    const response = await fetch(`${API_BASE_URL}/api/worlds/${id}`, {
      headers: getAuthHeaders()
    });
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error('Failed to fetch world');
    }
    return response.json();
  },

  async getWorldsByTheme(theme: string): Promise<World[]> {
    const response = await fetch(`${API_BASE_URL}/api/worlds?theme=${theme}`, {
      headers: getAuthHeaders()
    });
    if (!response.ok) {
      throw new Error('Failed to fetch worlds by theme');
    }
    return response.json();
  },

  async getFeaturedWorlds(): Promise<World[]> {
    const response = await fetch(`${API_BASE_URL}/api/worlds/featured`, {
      headers: getAuthHeaders()
    });
    if (!response.ok) {
      throw new Error('Failed to fetch featured worlds');
    }
    return response.json();
  },

  async invitePlayer(worldId: string, email: string, role: 'viewer' | 'editor'): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/api/worlds/${worldId}/invite`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ email, role }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to invite player');
    }
  },

  async updatePlayerAccess(worldId: string, userId: string, role: 'viewer' | 'editor'): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/api/worlds/${worldId}/access/${userId}`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify({ role }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update player access');
    }
  },

  async removePlayerAccess(worldId: string, userId: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/api/worlds/${worldId}/access/${userId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to remove player access');
    }
  },

  async updateAllWorldsCreator(email: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/api/admin/worlds/update-creator`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update worlds creator');
    }
  }
}; 