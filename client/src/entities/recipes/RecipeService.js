import { axiosInstance } from '../../components/shared/lib/axiosInstance';

export class RecipesService {
  static async getAll() {
    const response = await axiosInstance.get('/recipes');
    return response.data;
  }

  static async getById(id) {
    const response = await axiosInstance.get(`/recipes/${id}`)
    return response.data
  }

  static async create(data) {
    const response = await axiosInstance.post('/recipes', data);
    return response.data;
  }

  static async deleteById(id) {
    const response = await axiosInstance.delete(`/recipes/${id}`);
    return response.data;
  }
}
