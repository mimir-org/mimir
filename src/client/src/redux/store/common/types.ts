import { CollaborationPartner, ModuleDescription } from "@mimirorg/modelbuilder-types";
import { CombinedAttributeFilter, EnumBase } from "../../../models";
import { ApiError } from "../../../models/webclient";

// State types
export interface CommonState {
  fetching: boolean;
  collaborationPartners: CollaborationPartner[] | null;
  parsers: ModuleDescription[] | null;
  filters: CombinedAttributeFilter[] | null;
  statuses: EnumBase[] | null;
  apiError: ApiError[];
}

export interface FetchCollaboratorPartnersFinished {
  collaborationPartners: CollaborationPartner[];
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
