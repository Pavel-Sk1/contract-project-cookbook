import { axiosInstance } from '../../shared/lib/axiosInstance';

export class UserService {
  static async refreshTokens() {
    const response = await axiosInstance.get('/auth/refreshTokens');
    return response.data;
  }

  static async signUp(userData) {
    console.log('Sending signUp request to:', axiosInstance.defaults.baseURL + '/auth/signUp');
    console.log('Request data:', userData);
    
    try {
      const response = await axiosInstance.post('/auth/signUp', userData);
      console.log('SignUp response:', response);
      return response.data;
    } catch (error) {
      console.error('SignUp error:', error);
      console.error('Error response:', error.response);
      throw error;
    }
  }

  static async signIn(userData) {
    console.log('Sending signIn request to:', axiosInstance.defaults.baseURL + '/auth/signIn');
    try {
      const response = await axiosInstance.post('/auth/signIn', userData);
      return response.data;
    } catch (error) {
      console.error('SignIn error:', error);
      throw error;
    }
  }

  static async signOut() {
    const response = await axiosInstance.get('/auth/signOut');
    return response.data;
  }
}