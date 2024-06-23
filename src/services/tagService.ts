import apiClient from './apiClient';

export interface Tag {
  id: number;
  name: string;
}

const tagService = {
  getAllTags: async (): Promise<Tag[]> => {
    try {
      const response = await apiClient.get('/tags/getAllMyTags');
      return response.data.data;
    } catch (error) {
      console.error("Error fetching tags:", error);
      throw error;
    }
  },
  addTag: async (tag: Omit<Tag, 'id'>): Promise<Tag> => {
    try {
      const response = await apiClient.post('/tags/addNewTag', tag);
      return response.data.data;
    } catch (error) {
      console.error("Error adding tag:", error);
      throw error;
    }
  },
  deleteTag: async (id: number): Promise<void> => {
    try {
      const response = await apiClient.delete(`/tags/${id}`);
      return response.data.data;
    } catch (error) {
      console.error("Error deleting tag:", error);
      throw error;
    }
  },
};

export default tagService;
 