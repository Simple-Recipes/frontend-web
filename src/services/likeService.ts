import apiClient from './apiClient';
import { Recipe } from './recipeService';

export interface Like {
  userId?: number;
  recipeId: number;
}

const likeService = {
  getRecipeLikes: async (recipeId: number): Promise<number> => {
    try {
      const response = await apiClient.get('/likes/count', {
        params: { recipeId },
      });
      return response.data.data;
    } catch (error) {
      console.error("Error fetching likes:", error);
      throw error;
    }
  },
  likeRecipe: async (like: Like): Promise<Like> => {
    try {
      const response = await apiClient.post('/likes/likeRecipes', like);
      return response.data.data;
    } catch (error) {
      console.error("Error liking recipe:", error);
      throw error;
    }
  },
  unlikeRecipe: async (like: Like): Promise<void> => {
    try {
      const response = await apiClient.delete('/likes/UnlikeRecipe', {
        data: like,
      });
      return response.data.data;
    } catch (error) {
      console.error("Error unliking recipe:", error);
      throw error;
    }
  },
  getAllMyLikes: async (): Promise<Recipe[]> => {
    try {
      const response = await apiClient.get('/likes/getAllMyLikes');
      return response.data.data;
    } catch (error) {
      console.error("Error fetching user likes:", error);
      throw error;
    }
  }
};

export default likeService;
