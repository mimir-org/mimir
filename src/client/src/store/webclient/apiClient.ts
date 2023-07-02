import axios from "axios";
import { config } from "lib";
import { bearerTokenInterceptor } from "store/webclient";

export const apiClient = axios.create({
  baseURL: config.API_BASE_URL,
});

apiClient.interceptors.request.use(bearerTokenInterceptor);
