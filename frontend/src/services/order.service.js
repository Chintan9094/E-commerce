import api from "../api/axios";

export const placeOrder = (data) => api.post("/orders/place", data);
export const getMyOrders = () => api.get("/orders/my-orders");
export const getOrderById = (id) => api.get(`/orders/${id}`);
export const getAllOrders = (params) => {
  return api.get("/orders", { params });
};
export const updateOrderStatus = (id, status) => api.put(`/orders/${id}`, { status });