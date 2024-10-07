
import apiClient from './apiClient';
import { Tag } from './tagService';

export interface Recipe {
    id: number;
    title: string;
    ingredients: string[];
    directions: string[];
    link?: string;
    minutes: number;
    userId: number; 
    nutrition?: NutritionArray;
    createTime: string;
    updateTime: string;
    comments?: Comment[];
    tags?: Tag[];
}

export interface NutritionArray extends Array<number> {
    0: number; // calories
    1: number; // total_fat_PDV
    2: number; // sugar_PDV
    3: number; // sodium_PDV
    4: number; // protein_PDV
    5: number; // saturated_fat_PDV
    6: number; // carbohydrates_PDV
  }

export interface PageResult {
    total: number;
    records: Recipe[];
}

export interface ApiResponse<T> {
    code: number;
    msg: string;
    data: T;
}


const recipeService = {
    fetchPopularRecipes: async (): Promise<PageResult> => {
        const response = await apiClient.get<ApiResponse<PageResult>>('/recipes/popular');
        return response.data.data;
    },
    publishRecipe: async (recipe: Omit<Recipe, 'id' | 'createTime' | 'updateTime' | 'userId'>): Promise<Recipe> => {
        const response = await apiClient.post<ApiResponse<Recipe>>('/recipes/publish', recipe);
        return response.data.data;
    },
    searchRecipes: async (keyword: string): Promise<PageResult> => {
        const response = await apiClient.get<ApiResponse<PageResult>>('/recipes/search', {
            params: { keyword },
        });
        return response.data.data;
    },
    fetchRecipeDetails: async (id: number): Promise<Recipe> => {
        const response = await apiClient.get<ApiResponse<Recipe>>(`/recipes/${id}`);
        return response.data.data;
    },
    getUserRecipes: async (): Promise<Recipe[]> => {
        const response = await apiClient.get<ApiResponse<Recipe[]>>('/recipes/getAllMyRecipes');
        return response.data.data;
    },
    deleteRecipe: async (recipeId: number): Promise<void> => {
        await apiClient.delete(`/recipes/delete`, {
            params: { recipeId },
        });
    },
    editRecipe: async (recipe: Recipe): Promise<Recipe> => {
        const response = await apiClient.post<ApiResponse<Recipe>>('/recipes/edit', recipe);
        return response.data.data;
    },
    fetchAllRecipes: async (page: number, pageSize: number): Promise<PageResult> => {
        const response = await apiClient.get<ApiResponse<PageResult>>('/recipes/all', {
            params: { page, pageSize },
        });
        return response.data.data;
    },
    findPopularRecipesByTag: async (tag: string, page: number, pageSize: number): Promise<PageResult> => {
        const response = await apiClient.get<ApiResponse<PageResult>>('/recipes/tag/popular', {
            params: { tag, page, pageSize },
        });
        return response.data.data;
    },

};

export default recipeService;
