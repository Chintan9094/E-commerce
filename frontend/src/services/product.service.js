import api from "../api/axios";

export const getProducts = () => api.get("/products");
export const getProductById = (id) => api.get(`/products/${id}`);
export const searchProducts = (query) => api.get(`/products/get?${query}`);