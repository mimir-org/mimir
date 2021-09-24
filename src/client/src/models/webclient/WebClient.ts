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

    if (response.status === 204) {
      throw new Error(response.statusText);
    }

    if (response.status === 404) {
      throw new Error(TextResources.Error_ServerUnavailable);
    }

    response.data = await response.json();

    if (
      (response.status >= 200 && response.status < 300) ||
      response.status === 400
    ) {
      return response;
    } else {
      throw new Error(response.data.toString());
    }
  } catch (e) {
    throw new Error(TextResources.Error_ServerUnavailable);
  }
}

export async function get<T>(
  path: string,
  args: RequestInit = { method: "get" }
): Promise<HttpResponse<T>> {
  const req = { ...RequestInitDefault, ...args };
  const token = await Token();
  req.headers["Authorization"] = token;
  return await http<T>(new Request(path, req));
}

export async function post<T>(
  path: string,
  body: any,
  args: RequestInit = { method: "post", body: JSON.stringify(body) }
): Promise<HttpResponse<T>> {
  const token = await Token();
  const req = { ...RequestInitDefault, ...args };
  req.headers["Authorization"] = token;
  return await http<T>(new Request(path, req));
}

export async function put<T>(
  path: string,
  body: any,
  args: RequestInit = { method: "put", body: JSON.stringify(body) }
): Promise<HttpResponse<T>> {
  const token = await Token();
  const req = { ...RequestInitDefault, ...args };
  req.headers["Authorization"] = token;
  return await http<T>(new Request(path, req));
}
