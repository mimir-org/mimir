import getBadResponseData from "./getBadResponseData";
import { ApiError, HttpResponse } from "../../types/ApiTypes";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const GetApiErrorForBadRequest = (response: HttpResponse<any>, key: string): ApiError => {
  const data = getBadResponseData(response);

  return { key, errorMessage: data?.title, errorData: data };
};

export default GetApiErrorForBadRequest;
