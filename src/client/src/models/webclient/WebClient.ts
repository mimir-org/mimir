import { msalInstance } from "../../index";
import { loginRequest } from "./MsalConfig";
import { HttpResponse, RequestInitDefault } from ".";
import { TextResources } from "../../assets/text/TextResources";

export const Token = async () => {
  if (!msalInstance) return "";

  const account = msalInstance.getActiveAccount();
  if (!account) throw Error(TextResources.ERROR_NOACCOUNT);

  const response = await msalInstance.acquireTokenSilent({ ...loginRequest, account });
  return `Bearer ${response.accessToken}`;
};

export async function http<T>(request: RequestInfo): Promise<HttpResponse<T>> {
  let response: HttpResponse<T> = null;

  try {
    response = await fetch(request);
    if (!isValidStatus(response.status)) throw new Error(errorMessage(response));

    if (hasContent(response)) {
      try {
        response.data = await response.json();
      } catch (error) {
        // Ignore badly formatted json response
      }
    }

    return response;
  } catch (e) {
    throw new Error(e);
  }
}

const isValidStatus = (status: number) => (status >= 200 && status < 300) || status === 400;
const hasContent = <T>(response: HttpResponse<T>) => response.status !== 204;

const errorMessage = <T>(response: HttpResponse<T>) => {
  if (response.status >= 401 && response.status <= 403) return TextResources.ERROR_FORBIDDEN;
  if (response.status >= 500) return TextResources.ERROR_SERVER;

  return TextResources.ERROR_SERVER_UNAVAILABLE;
};

export async function get<T>(path: string, args: RequestInit = { method: "get" }): Promise<HttpResponse<T>> {
  const req = { ...RequestInitDefault, ...args };
  const token = await Token();
  req.headers["Authorization"] = token;
  return http<T>(new Request(path, req));
}

export async function post<T>(
  path: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: any,
  args: RequestInit = { method: "post", body: JSON.stringify(body) }
): Promise<HttpResponse<T>> {
  const token = await Token();
  const req = { ...RequestInitDefault, ...args };
  req.headers["Authorization"] = token;
  return http<T>(new Request(path, req));
}

export async function put<T>(
  path: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: any,
  args: RequestInit = { method: "put", body: JSON.stringify(body) }
): Promise<HttpResponse<T>> {
  const token = await Token();
  const req = { ...RequestInitDefault, ...args };
  req.headers["Authorization"] = token;
  return http<T>(new Request(path, req));
}

export async function del<T>(path: string, args: RequestInit = { method: "delete" }): Promise<HttpResponse<T>> {
  const token = await Token();
  const req = { ...RequestInitDefault, ...args };
  req.headers["Authorization"] = token;
  return http<T>(new Request(path, req));
}
