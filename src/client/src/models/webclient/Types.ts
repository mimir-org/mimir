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

export const HeadersInitDefault = {
  Accept: "application/json",
  "Content-Type": "application/json",
  "Access-Control-Allow-Methods": "DELETE, POST, GET, PUT, OPTIONS",
  "Access-Control-Allow-Origin": window.location.protocol + "//" + window.location.host,
  "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
  Origin: window.location.protocol + "//" + window.location.host,
  "Cache-Control": "no-cache",
};

export const RequestInitDefault: RequestInit = {
  method: "get",
  cache: "no-store",
  headers: { ...HeadersInitDefault },
};
