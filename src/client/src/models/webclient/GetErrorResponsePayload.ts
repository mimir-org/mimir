import { ApiError } from ".";

export interface Payload {
  type: string;
  payload: any;
}

const GetErrorResponsePayload = (error: Error, type: string, payload: any): Payload => {

  payload.apiError = {
    key: type,
    errorMessage: error.message,
    errorData: null,
  } as ApiError

  return payload;
}

export default GetErrorResponsePayload;