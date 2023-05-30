import axios from "axios";
import { getToken, deleteToken } from "./auth";

const API_BASE_URL = undefined;
const basic_auth_token = process.env.PUBLIC_BASIC_AUTH



export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = getToken();
  config.headers.Authorization = `Basic ${basic_auth_token}`
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      deleteToken();
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);
