import { reject } from "lodash";
import { authProvider } from '../../providers/authProvider';

interface HttpResponse<T> extends Response {
    data?: T;
}

export async function getUserProfile() {
    try {
        var idToken = await authProvider.getIdToken();
        if (idToken) {
            var user = { 'displayName': idToken.idToken.name };
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
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Methods": "DELETE, POST, GET, PUT, OPTIONS",
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
        "Origin": "http://localhost:3000",
        "Cache-Control": "no-cache"
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

export async function get<T>(path: string, args: RequestInit = { method: "get" }
): Promise<HttpResponse<T>> {
    const req = { ...RequestInitDefault, ...args };
    var idTokenResponse = await authProvider.getIdToken();
    req.headers["Authorization"] = 'Bearer ' + idTokenResponse.idToken.rawIdToken;
    return await http<T>(new Request(path, req));
}

export async function post<T>(
    path: string,
    body: any,
    args: RequestInit = { method: "post", body: JSON.stringify(body) }
): Promise<HttpResponse<T>> {
    const req = { ...RequestInitDefault, ...args };
    var idTokenResponse = await authProvider.getIdToken();
    req.headers["Authorization"] = 'Bearer ' + idTokenResponse.idToken.rawIdToken;
    return await http<T>(new Request(path, req));
}

export async function put<T>(
    path: string,
    body: any,
    args: RequestInit = { method: "put", body: JSON.stringify(body) }
): Promise<HttpResponse<T>> {
    const req = { ...RequestInitDefault, ...args };
    var idTokenResponse = await authProvider.getIdToken();
    req.headers["Authorization"] = 'Bearer ' + idTokenResponse.idToken.rawIdToken;
    return await http<T>(new Request(path, req));
}
