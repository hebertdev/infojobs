import axios from "axios";
import { getToken, deleteToken } from "./auth";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BACKEND;

export const axiosInstanceBackend = axios.create({
  baseURL: API_BASE_URL,
});

axiosInstanceBackend.interceptors.request.use((config) => {
  const token = getToken();
  console.log(API_BASE_URL)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstanceBackend.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      deleteToken();
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);
