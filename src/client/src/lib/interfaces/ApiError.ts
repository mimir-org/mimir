import {AxiosError} from "axios";

export interface ApiError {
    id: string;
    error: AxiosError;
}