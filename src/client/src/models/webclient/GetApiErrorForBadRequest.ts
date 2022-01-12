import { ApiError, GetBadResponseData, HttpResponse } from ".";

const GetApiErrorForBadRequest = (response: HttpResponse<any>, key: string): ApiError => {
  const data = GetBadResponseData(response);

  return {
    key,
    errorMessage: data?.title,
    errorData: data,
  };
}

export default GetApiErrorForBadRequest;
