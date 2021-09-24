import { msalInstance } from "../../index";
import { loginRequest } from "./MsalConfig";
import { RequestInitDefault, HttpResponse } from ".";
import { TextResources } from "../../assets/text";

export const Token = async () => {
  const account = msalInstance.getActiveAccount();

  if (!account) {
    throw Error(TextResources.Error_NoActiveAccount);
  }

  const response = await msalInstance.acquireTokenSilent({
    ...loginRequest,
    account: account,
  });

  return `Bearer ${response.accessToken}`;
};

export async function http<T>(request: RequestInfo): Promise<HttpResponse<T>> {
  let response: HttpResponse<T> = null;

  try {
    response = await fetch(request);

    if (!isValidStatus(response.status)) {
      throw new Error();
    }

    if (hasContent(response)) {
      response.data = await response.json();
    }

    return response;
  } catch (e) {
    throw new Error(TextResources.Error_ServerUnavailable);
  }
}

const isValidStatus = (status: number) =>
  (status >= 200 && status < 300) || status === 400;

const hasContent = <T>(response: HttpResponse<T>) => response.status !== 204;

export async function get<T>(
  path: string,
  args: RequestInit = { method: "get" }
): Promise<HttpResponse<T>> {
  const req = { ...RequestInitDefault, ...args };
  const token = await Token();
  req.headers["Authorization"] = token;
  return http<T>(new Request(path, req));
}

export async function post<T>(
  path: string,
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
  body: any,
  args: RequestInit = { method: "put", body: JSON.stringify(body) }
): Promise<HttpResponse<T>> {
  const token = await Token();
  const req = { ...RequestInitDefault, ...args };
  req.headers["Authorization"] = token;
  return http<T>(new Request(path, req));
}
