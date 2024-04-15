import axios from "axios";
import { API_URL } from "../config";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getCategories = async () => {
  try {
    const response = await axios.get(`${API_URL}/products/categories`);
    console.log(response);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/products`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    throw error;
  }
};

export const getProductsByCategory = async (category: string) => {
  try {
    const response = await axios.get(
      `${API_URL}/products/category/${category}`
    );
    return response.data;
  } catch (error) {
    console.error("Error al obtener los productos de la categoría:", error);
    throw error;
  }
};

export const getProductById = async (id: string) => {
  try {
    const response = await axios.get(`${API_URL}/products/${id}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el producto:", error);
    throw error;
  }
};

export const postAddToCart = createAsyncThunk(
  "cart/postAddToCart",
  async ({ userId, productId }: { userId: string; productId: string }) => {
    const response = await axios.post(
      `${API_URL}/carts/user/${userId}/product/${productId}`
    );
    return response.data;
  }
);

export const login = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
