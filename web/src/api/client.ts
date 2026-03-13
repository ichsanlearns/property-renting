import axios from "axios";
import { useAuthStore } from "../stores/auth.store";
import { refreshSession } from "./services/auth.service";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:8000/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;

    if (error.response.status === 401 && !original._retry) {
      original._retry = true;

      const res = await refreshSession();

      useAuthStore.getState().setToken(res.data.data.accessToken);

      original.headers.Authorization = `Bearer ${res.data.data.accessToken}`;

      return api(original);
    }

    return Promise.reject(error);
  },
);

export default api;
