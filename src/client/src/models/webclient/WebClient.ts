import { msalInstance } from "../../index";
import { loginRequest } from "./MsalConfig";
import { RequestInitDefault, HttpResponse } from ".";

export const Token = async () => {
    const account = msalInstance.getActiveAccount();

    if (!account) {
        throw Error("No active account! Verify a user has been signed in and setActiveAccount has been called.");
    }

    const response = await msalInstance.acquireTokenSilent({
        ...loginRequest,
        account: account
    });

    return `Bearer ${response.accessToken}`;
}

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

export async function get<T>(path: string, args: RequestInit = { method: "get" }): Promise<HttpResponse<T>> {
    const req = { ...RequestInitDefault, ...args };
    const token = await Token();
    req.headers["Authorization"] = token;
    return await http<T>(new Request(path, req));
}

export async function post<T>(path: string, body: any, args: RequestInit = { method: "post", body: JSON.stringify(body) }): Promise<HttpResponse<T>> {
    const token = await Token();
    const req = { ...RequestInitDefault, ...args };
    req.headers["Authorization"] = token;
    return await http<T>(new Request(path, req));
}

export async function put<T>(path: string, body: any, args: RequestInit = { method: "put", body: JSON.stringify(body) }): Promise<HttpResponse<T>> {
    const token = await Token();
    const req = { ...RequestInitDefault, ...args };
    req.headers["Authorization"] = token;
    return await http<T>(new Request(path, req));
}
