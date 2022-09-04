import { ModuleDescription } from "@mimirorg/modelbuilder-types";
import { MimirorgCompanyCm } from "@mimirorg/typelibrary-types";
import { CombinedAttributeFilter, EnumBase } from "../../../models";
import { ApiError } from "../../../models/webclient";

// State types
export interface CommonState {
  fetching: boolean;
  companies: MimirorgCompanyCm[] | null;
  company: MimirorgCompanyCm | null;
  parsers: ModuleDescription[] | null;
  filters: CombinedAttributeFilter[] | null;
  statuses: EnumBase[] | null;
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
  statuses: EnumBase[];
  apiError: ApiError;
}

export interface FetchCombinedAttributeFilterFinished {
  filters: CombinedAttributeFilter[];
  apiError: ApiError;
}

export interface FetchParsersFinished {
  parsers: ModuleDescription[];
  apiError: ApiError;
}
