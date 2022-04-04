import { ApiError } from ".";

const GetApiErrorForException = (error: Error, key: string): ApiError => {
  return { key, errorMessage: error?.message, errorData: null };
};

export default GetApiErrorForException;
