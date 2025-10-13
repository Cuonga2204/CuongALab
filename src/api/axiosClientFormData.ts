import axios from "axios";
import { authHelpers } from "src/helpers/auth.helpers";

const backendUrl = import.meta.env.VITE_API_URL;

const { accessToken } = authHelpers.getAuth();
const axiosClientFormData = axios.create({
  baseURL: backendUrl,
  headers: {
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${accessToken}`,
  },
});

export default axiosClientFormData;
