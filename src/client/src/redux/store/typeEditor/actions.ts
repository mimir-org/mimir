import {
  CREATING_TYPE,
  FETCHING_INITIAL_DATA,
  FETCHING_RDS,
  FETCHING_TERMINALS,
  CHANGE_ASPECT,
  TypeEditorActionTypes,
} from "./types";
import {
  NodeType,
  Terminal,
  Attribute,
  Dictionary,
} from "../../../models/project";

// TO DO create type, save type, get attributes

export function create(
  id: string,
  aspect: NodeType,
  objectType: string,
  typeName: string,
  status: string,
  rds: string,
  rdsCategory: string,
  semanticRdsReference: string,
  terminals: Terminal[],
  attributes: Attribute[],
  version: string,
  semanticReference: string
): TypeEditorActionTypes {
  return {
    type: CREATING_TYPE,
    payload: {
      aspect: aspect,
      objectType: objectType,
      typeName: typeName,
      status: status,
      rds: rds,
      rdsCategory: rdsCategory,
      semanticRdsReference: semanticRdsReference,
      terminals: terminals,
      attributes: attributes,
      version: "1.0",
      semanticReference: semanticReference,
    },
  };
}

export function getInitialData(): TypeEditorActionTypes {
  return {
    type: FETCHING_INITIAL_DATA,
    payload: null,
  };
}

export function getRDS(aspect: string): TypeEditorActionTypes {
  return {
    type: FETCHING_RDS,
    payload: {
      aspect,
    },
  };
}

export function getTerminals(): TypeEditorActionTypes {
  return {
    type: FETCHING_TERMINALS,
    payload: null,
  };
}

export function changeSelectedAspect(aspect: Dictionary) {
  return {
    type: CHANGE_ASPECT,
    payload: {
      aspect,
    },
  };
}
