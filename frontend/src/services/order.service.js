import api from "../api/axios";

export const placeOrder = () => api.post("/orders/place");
export const getMyOrders = () => api.get("/orders/my-orders");
export const getAllOrders = () => api.get("/orders");
export const updateOrderStatus = (id, status) =>
  api.put(`/orders/${id}`, { status });
