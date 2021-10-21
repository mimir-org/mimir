import { ApiError, GetBadResponseData, HttpResponse } from ".";

export interface Payload {
  type: string;
  payload: any;
}

const GetBadRequestPayload = (response: HttpResponse<any>, type: string): Payload => {
  const data = GetBadResponseData(response);
  const apiError = {
    key: type,
    errorMessage: data.title,
    errorData: data,
  } as ApiError;

  const payload = {
    apiError: apiError,
  };

  return { type: type, payload: payload };
}

export default GetBadRequestPayload;
