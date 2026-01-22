import api from "../api/axios";

export const getProducts = () => api.get("/products");
export const getProductsByQuery = (params) => {
  return api.get("/products/get", { params });
};
export const getProductById = (id) => api.get(`/products/${id}`);
export const getMyProducts = (params) => api.get("/products/my", { params });