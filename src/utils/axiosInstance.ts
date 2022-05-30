import axios from "axios";

export const axiosInterceptor = (token: string) => {
  axios.interceptors.request.use((config) => {
    config.headers = {
      "Content-Type": "application/json",
      "Authorization": token,
    };
    return config
  }, function (error) {
    return Promise.reject(error);
  })
}

