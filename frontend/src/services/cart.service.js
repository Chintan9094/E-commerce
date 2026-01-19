import api from "../api/axios";

export const addToCart = (productId, quantity = 1) => api.post("/cart/add", { productId, quantity });
export const removeFromCart = (productId) => api.delete("/cart/remove", { data: { productId } });
export const getMyCart = () => api.get("/cart/cart");
export const updateCartQuantity = (productId, quantity) => api.put("/cart/update", { productId, quantity });