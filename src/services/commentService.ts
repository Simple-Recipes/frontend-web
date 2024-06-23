import apiClient from './apiClient';

export interface Comment {
  id?: number;
  recipeId: number;
  userId: number;
  content: string;
  createTime?: string;
}

export interface Result<T> {
  code: number;
  message: string;
  data: T;
}

const commentService = {
  postComment: async (comment: Comment): Promise<Comment> => {
    try {
      const response = await apiClient.post<Result<Comment>>('/comments/postRecipeComment', comment);
      console.log("postComment response data:", response.data);
      return response.data.data;
    } catch (error) {
      console.error("Error in postComment:", error);
      throw error;
    }
  },

  getRecipeComments: async (recipeId: number): Promise<Comment[]> => {
    try {
      const response = await apiClient.get<Result<Comment[]>>('/comments/getRecipeComments', {
        params: { recipeId },
      });
      console.log("getRecipeComments response data:", response.data);
      return response.data.data;
    } catch (error) {
      console.error("Error in getRecipeComments:", error);
      throw error;
    }
  },

  deleteComment: async (commentId: number, userId: number): Promise<void> => {
    try {
      const response = await apiClient.delete<Result<void>>('/comments/deleteComment', {
        params: { commentId, userId },
      });
      console.log("deleteComment response data:", response.data);
    } catch (error) {
      console.error("Error in deleteComment:", error);
      throw error;
    }
  }
};

export default commentService;
