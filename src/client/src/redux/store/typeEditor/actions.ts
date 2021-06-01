import {
  CREATING_TYPE,
  FETCHING_INITIAL_DATA,
  TypeEditorActionTypes,
} from "./types";
import { NodeType, Terminal, Attribute } from "../../../models/project";

// TO DO create type, save type, get aspects, get object types,
// get status, get RDS, get terminals, get attributes

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
