import apiClient from './apiClient';

export interface UserProfile {
  id: number;
  username: string;
  password: string;
  email: string;
  avatar: string | null;
  createTime?: string;
}

const userService = {
  getUserProfile: async (): Promise<UserProfile> => {
    try {
      const response = await apiClient.get<{
        code: number;
        msg: string;
        data: UserProfile;
      }>('/user/profile');
      console.log("getUserProfile response data:", response.data);
      return response.data.data;
    } catch (error) {
      console.error("Error in getUserProfile:", error);
      throw error;
    }
  },
  updateUserProfile: async (data: Partial<UserProfile>): Promise<UserProfile> => {
    try {
      const response = await apiClient.put<{
        code: number;
        msg: string;
        data: UserProfile;
      }>('/user/profile', data);
      //console.log("updateUserProfile response data:", response.data);
      return response.data.data;
    } catch (error) {
      console.error("Error in updateUserProfile:", error);
      throw error;
    }
  },
};

export default userService;