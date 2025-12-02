import { API } from "./api";

export const getAllProducts = () => API.get("/products");
export const getProductDetails = (id) => API.get(`/products/${id}`);
