import axios from "axios";
import { useAuthStore } from "../features/auth/stores/auth.store";
import { refreshSession } from "../features/auth/api/auth.service";

let isRefreshing = false;
let refreshPromise: Promise<string> | null = null;

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:8000/api",
});

const apiAuth = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:8000/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  if (config.data instanceof FormData) {
    if (config.headers) {
      delete config.headers["Content-Type"];
      delete config.headers["content-type"];
    }
  } else {
    if (config.headers) {
      config.headers["Content-Type"] = "application/json";
    }
  }

  const { token } = useAuthStore.getState();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;

    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;

        refreshPromise = (async () => {
          try {
            const res = await refreshSession();
            const newToken = res.data.accessToken;

            useAuthStore.getState().setToken(newToken);

            return newToken;
          } catch (err) {
            useAuthStore.getState().logout();
            throw err;
          } finally {
            isRefreshing = false;
          }
        })();
      }

      const newToken = await refreshPromise;

      original.headers.Authorization = `Bearer ${newToken}`;

      return api(original);
    }

    return Promise.reject(error);
  },
);

export default api;
export { apiAuth };
