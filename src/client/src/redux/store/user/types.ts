import { User } from "../../../models";
import { ApiError } from "../../../models/webclient";

// State types
export interface UserState {
  fetching: boolean;
  user: User | null;
  apiError: ApiError[];
}

export interface FetchUserActionFinished {
  user: User;
  apiError: ApiError;
}
