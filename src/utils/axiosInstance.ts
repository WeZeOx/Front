import axios, { AxiosRequestConfig } from "axios";

let id: number | undefined

export const axiosInterceptor = (token: string) => {
  if (id !== undefined) axios.interceptors.request.eject(id)
  id = axios.interceptors.request.use((config: AxiosRequestConfig) => {
    if (!config.headers) config.headers = {};
    config.headers["Authorization"] = token;
    config.headers["Content-Type"] = "application/json";
    return config;
  }, (error) => {
    return Promise.reject(error);
  })
}

