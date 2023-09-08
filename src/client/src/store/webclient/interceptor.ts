import { InternalAxiosRequestConfig } from "axios";
import { msalInstance } from "index";
import { loginRequest } from "store/webclient";

/**
 * This middleware checks if there's an access token available in localstorage,
 * and appends it to the request headers if available.
 *
 * @param config
 */
export async function bearerTokenInterceptor(config: InternalAxiosRequestConfig) {
  if (!msalInstance) return config;

  const account = msalInstance.getActiveAccount();
  if (!account) return config;

  const response = await msalInstance.acquireTokenSilent({ ...loginRequest, account });
  if (response == null) return config;

  if (response?.accessToken && config.headers) {
    config.headers["Authorization"] = `Bearer ${response.accessToken}`;
  }

  return config;
}
