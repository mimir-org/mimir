import { reject } from "lodash";

interface HttpResponse<T> extends Response {
  data?: T;
}

const RequestInitDefault: RequestInit = {
  method: "get",
  cache: "no-store",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Origin": "",
    "Cache-Control": "no-cache",
  },
};

export async function http<T>(request: RequestInfo): Promise<HttpResponse<T>> {
  const response: HttpResponse<T> = await fetch(request);

  try {
    response.data = await response.json();
  } catch (ex) {
    reject(response);
  }

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response;
}

export async function get<T>(
  path: string,
  args: RequestInit = { method: "get" }
): Promise<HttpResponse<T>> {
  const req = { ...RequestInitDefault, ...args };
  return await http<T>(new Request(path, req));
}

export async function post<T>(
  path: string,
  body: any,
  args: RequestInit = { method: "post", body: JSON.stringify(body) }
): Promise<HttpResponse<T>> {
  const req = { ...RequestInitDefault, ...args };
  return await http<T>(new Request(path, req));
}

export async function put<T>(
  path: string,
  body: any,
  args: RequestInit = { method: "put", body: JSON.stringify(body) }
): Promise<HttpResponse<T>> {
  const req = { ...RequestInitDefault, ...args };
  return await http<T>(new Request(path, req));
}
