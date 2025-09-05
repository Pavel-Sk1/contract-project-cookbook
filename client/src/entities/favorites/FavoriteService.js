import { axiosInstance } from '../../shared/lib/axiosInstance';

export class FavoriteService {
    static async getAll() {
    const response = await axiosInstance.get('/favorites');
    return response.data;
  }
  static async getByUserId(userId) {
    const response = await axiosInstance.get(`/favorites/${userId}`)
    return response.data
  }
  static async addFavorite(userData) {
    const response = await axiosInstance.post('/favorites', userData)
    return response.data
  }
  static async removeFavorite (userId, recipeId) {
    const response = await axiosInstance.delete(`/favorites/${userId}/${recipeId}`)
    return response.data
  }
}