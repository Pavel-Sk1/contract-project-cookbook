import { axiosInstance } from '../../shared/lib/axiosInstance';

export class UserService {
  static async refreshTokens() {
    const response = await axiosInstance.get('/auth/refreshTokens');
    return response.data;
  }

  static async signUp(userData) {
    const response = await axiosInstance.post('/auth/signUp', userData);
    console.log('response', response);
    return response.data;
  }

  static async signIn(userData) {
    const response = await axiosInstance.post('/auth/signIn', userData);
    return response.data;
  }

  static async signOut() {
    const response = await axiosInstance.get('/auth/signOut');
    return response.data;
  }
}
