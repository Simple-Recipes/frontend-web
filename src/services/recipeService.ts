
import apiClient from './apiClient';

export interface Recipe {
    id: number;
    title: string;
    ingredients: string[];
    directions: string[];
    link?: string;
    source?: string;
    ner: string[];
    createTime: string;
    updateTime: string;
    userId: number;
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
    }
};

export default recipeService;
