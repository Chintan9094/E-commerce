import api from "../api/axios";

export const registerUser = (data) =>
  api.post("/auth/register", data);

export const loginUser = (data) =>
  api.post("/auth/login", data);

export const logoutUser = () =>
  api.post("/auth/logout");

export const getProfile = () =>
  api.get("/auth/me");

export const updateProfile = (data) =>
  api.put("/auth/me", data);