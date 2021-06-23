import {
  TerminalType,
  TerminalTypeItem,
  Aspect,
  ObjectType,
  Status,
} from "../../../models";
import {
  CREATING_TYPE,
  CHANGE_MODE,
  FETCHING_INITIAL_DATA,
  FETCHING_RDS,
  FETCHING_TERMINALS,
  FETCHING_ATTRIBUTES,
  CHANGE_ASPECT,
  CHANGE_OBJECTTYPE,
  CHANGE_TYPENAME,
  CHANGE_STATUS,
  CHANGE_RDS,
  CHANGE_SEMANTICREFERENCE,
  UPDATE_TERMINALTYPES,
  UPDATE_ATTRIBUTETYPES,
  TypeEditorActionTypes,
} from "./types";

// TO DO create type, save type, get attributes

export function create(
  aspect: Aspect,
  objectType: string,
  typeName: string,
  status: string,
  rds: string,
  rdsCategory: string,
  semanticRdsReference: string,
  terminals: TerminalType[],
  attributes: string[],
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

export function getRDS(aspect: Aspect): TypeEditorActionTypes {
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

export function getAttributes(aspect: Aspect): TypeEditorActionTypes {
  return {
    type: FETCHING_ATTRIBUTES,
    payload: {
      aspect,
    },
  };
}

export function changeMode(mode: string) {
  return {
    type: CHANGE_MODE,
    payload: {
      mode,
    },
  };
}

export function changeSelectedAspect(aspect: Aspect) {
  return {
    type: CHANGE_ASPECT,
    payload: {
      aspect,
    },
  };
}

export function changeSelectedObjecttype(objectType: ObjectType) {
  return {
    type: CHANGE_OBJECTTYPE,
    payload: {
      objectType,
    },
  };
}

export function changeTypeName(typeName: string) {
  return {
    type: CHANGE_TYPENAME,
    payload: {
      typeName,
    },
  };
}

export function changeStatus(status: Status) {
  return {
    type: CHANGE_STATUS,
    payload: {
      status,
    },
  };
}

export function changeRDS(rds: string) {
  return {
    type: CHANGE_RDS,
    payload: {
      rds,
    },
  };
}

export function changeSemanticReference(semanticReference: string) {
  return {
    type: CHANGE_SEMANTICREFERENCE,
    payload: {
      semanticReference,
    },
  };
}

export function updateTerminalTypes(terminalTypes: TerminalTypeItem[]) {
  return {
    type: UPDATE_TERMINALTYPES,
    payload: {
      terminalTypes,
    },
  };
}

export function updateAttributesList(attributeTypes: string[]) {
  return {
    type: UPDATE_ATTRIBUTETYPES,
    payload: {
      attributeTypes,
    },
  };
}
