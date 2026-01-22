import api from "../api/axios";

export const getProducts = () => api.get("/products");
export const getProductsByQuery = (params) => {
  return api.get("/products/get", { params });
};
export const getProductById = (id) => api.get(`/products/${id}`);
export const getMyProducts = (params) => api.get("/products/my", { params });
export const createProduct = (formData) =>
  api.post("/products/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const deleteProduct = (id) => api.delete(`/products/${id}`);