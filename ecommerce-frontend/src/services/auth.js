import { API } from "./api";

export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post("/auth/login", data);
export const logoutUser = () => API.post("/auth/logout");
export const getCurrentUser = () => API.get("/users/me");
export const updateUser = (data) => API.put("/users/me", data);
