import axios from 'axios';
import { API_URL } from '../config';

export const getCategories = async () => {
  try {
    const response = await axios.get(`${API_URL}/products/categories`);
    console.log(response);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProductsByCategory = async (category: string) => {
  try {
    const response = await axios.get(`${API_URL}/products/category/${category}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener los productos de la categoría:', error);
    throw error;
  }
};