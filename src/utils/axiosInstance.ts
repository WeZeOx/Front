import axios from "axios";
import { useEditorJWT } from "./jwt.store";
const useEditor = useEditorJWT()

const axiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
    "Authorization": useEditor.getJwtToken(),
  }
});

axiosInstance.interceptors.request.use(req => {
  return req
})


export default axiosInstance;