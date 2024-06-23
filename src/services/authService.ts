// src/services/authService.ts
import apiClient from './apiClient';

interface LoginResponse {
    code: number;
    msg: string;
    data: {
        token: string;
    };
}

interface RegisterResponse {
    code: number;
    msg: string;
  }

  interface ResetPasswordResponse {
    code: number;
    msg: string;
  }

  interface RequestPasswordResetResponse {
    code: number;
    msg: string;
  }
const authService = {
    login: async (username: string, password: string): Promise<LoginResponse> => {
        const response = await apiClient.post<LoginResponse>('/user/login', {
            username,
            password,
        }, {
            withCredentials: true,
        });
        return response.data;
    },
    register: async (username: string, email: string, password: string): Promise<RegisterResponse> => {
        const response = await apiClient.post<RegisterResponse>('/user/register', {
          username,
          email,
          password,
        });
        return response.data;
      },
      resetPassword: async (token: string, newPassword: string): Promise<ResetPasswordResponse> => {
        const response = await apiClient.post<ResetPasswordResponse>(
          '/user/resetPassword',
          null,
          {
            params: { newPassword },
            headers: { 'User-Token': token },
          }
        );
        return response.data;
      },
      requestPasswordReset: async (email: string): Promise<RequestPasswordResetResponse> => {
        const response = await apiClient.post<RequestPasswordResetResponse>('/user/forgotPassword', {
          email,
        });
        return response.data;
      }
    
    
};

export default authService;
