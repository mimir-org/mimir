import { ModuleDescription } from "@mimirorg/modelbuilder-types";
import { MimirorgCompanyCm } from "@mimirorg/typelibrary-types";
import { ApiError } from "../../../models/webclient";

// State types
export interface CommonState {
  fetching: boolean;
  companies: MimirorgCompanyCm[] | null;
  company: MimirorgCompanyCm | null;
  parsers: ModuleDescription[] | null;
  apiError: ApiError[];
}

export interface FetchCompaniesFinished {
  companies: MimirorgCompanyCm[];
  apiError: ApiError;
}

export interface FetchCompanyFinished {
  company: MimirorgCompanyCm;
  apiError: ApiError;
}

export interface FetchStatusesFinished {
  apiError: ApiError;
}

export interface FetchParsersFinished {
  parsers: ModuleDescription[];
  apiError: ApiError;
}
