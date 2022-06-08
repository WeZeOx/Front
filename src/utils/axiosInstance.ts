import axios from "axios";

let id: number

export const axiosInterceptor = (token: string) => {
  axios.interceptors.request.eject(id)
  id = axios.interceptors.request.use(config => {
    config.headers = {
      "Content-Type": "application/json",
      "Authorization": token,
    };
    return config
  }, function (error) {
    return Promise.reject(error);
  })
}

