import { ApiError } from "../../types/ApiTypes";

const getApiErrorForException = (error: Error, key: string): ApiError => {
  return { key, errorMessage: error?.message, errorData: null };
};

export default getApiErrorForException;
