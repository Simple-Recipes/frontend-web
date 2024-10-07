// src/services/favoriteService.ts
import apiClient from './apiClient';
import { Recipe } from './recipeService';

export interface Favorite {
  userId: number;
  recipeId: number;
  createTime?: string;
}

const favoriteService = {
  addToFavorites: async (recipeId: number): Promise<Favorite> => {
    try {
      const response = await apiClient.post('/favorites/add', { recipeId });
      return response.data.data;
    } catch (error) {
      console.error("Error adding to favorites:", error);
      throw error;
    }
  },
  removeFromFavorites: async (recipeId: number): Promise<void> => {
    try {
      await apiClient.delete('/favorites/remove', { params: { recipeId } });
    } catch (error) {
      console.error("Error removing from favorites:", error);
      throw error;
    }
  },
  getAllMyFavorites: async (): Promise<Recipe[]> => {
    try {
      const response = await apiClient.get('/favorites/getAllMyFavorites');
      return response.data.data;
    } catch (error) {
      console.error("Error fetching user favorites:", error);
      throw error;
    }
  }
};

export default favoriteService;
