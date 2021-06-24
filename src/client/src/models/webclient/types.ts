import { authProvider } from "../../providers/authProvider";

export interface ApiError {
  key: string;
  errorMessage: string;
  errorData: BadRequestData;
}
export interface BadRequestData {
  title: string;
  items: BadRequestDataItem[];
}
export interface BadRequestDataItem {
  key: string;
  value: string;
}

export interface HttpResponse<T> extends Response {
  data?: T;
}

export async function getUserProfile() {
  try {
    var idToken = await authProvider.getIdToken();
    if (idToken) {
      var user = { displayName: idToken.idToken.name };
      return user;
    }
  } catch (error) {
    throw new Error("Could not load user data");
  }
}

const RequestInitDefault: RequestInit = {
  method: "get",
  cache: "no-store",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Methods": "DELETE, POST, GET, PUT, OPTIONS",
    "Access-Control-Allow-Origin": "http://localhost:3000",
    "Access-Control-Allow-Headers":
      "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
    Origin: "http://localhost:3000",
    "Cache-Control": "no-cache",
  },
};

export async function http<T>(request: RequestInfo): Promise<HttpResponse<T>> {
  let response: HttpResponse<T> = null;

  try {
    response = await fetch(request);
    if (!response || !response.ok) {
      if (
        (response.status >= 200 && response.status < 300) ||
        response.status === 400
      ) {
        response.data = await response.json();
        return response;
      } else {
        if (response.status === 404) {
          throw new Error("Ther server is unavailable");
        }
        response.data = await response.json();
        throw new Error(response.data.toString());
      }
    } else {
      if (response.status === 204) {
        throw new Error(response.statusText);
      }

      response.data = await response.json();
      return response;
    }
  } catch (e) {
    throw new Error("Ther server is unavailable");
  }
}

export async function get<T>(
  path: string,
  args: RequestInit = { method: "get" }
): Promise<HttpResponse<T>> {
  const req = { ...RequestInitDefault, ...args };
  var idTokenResponse = await authProvider.getAccessToken();
  req.headers["Authorization"] = "Bearer " + idTokenResponse.accessToken;
  return await http<T>(new Request(path, req));
}

export async function post<T>(
  path: string,
  body: any,
  args: RequestInit = { method: "post", body: JSON.stringify(body) }
): Promise<HttpResponse<T>> {
  const req = { ...RequestInitDefault, ...args };
  var idTokenResponse = await authProvider.getAccessToken();
  req.headers["Authorization"] = "Bearer " + idTokenResponse.accessToken;
  return await http<T>(new Request(path, req));
}

export async function put<T>(
  path: string,
  body: any,
  args: RequestInit = { method: "put", body: JSON.stringify(body) }
): Promise<HttpResponse<T>> {
  const req = { ...RequestInitDefault, ...args };
  var idTokenResponse = await authProvider.getAccessToken();
  req.headers["Authorization"] = "Bearer " + idTokenResponse.accessToken;
  return await http<T>(new Request(path, req));
}
