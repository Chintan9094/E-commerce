import api from "../api/axios";

export const addAddress = (data) => api.post("/addresses", data);

export const getMyAddresses = () => api.get("/addresses");

export const deleteAddress = (id) => api.delete(`/addresses/${id}`);

export const updateAddress = (id, data) => api.put(`/addresses/${id}`, data);