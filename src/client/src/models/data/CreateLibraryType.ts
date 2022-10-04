import { ObjectType } from "../enums/ObjectType";
import { PredefinedAttribute } from "./PredefinedAttribute";
import { Aspect } from "@mimirorg/modelbuilder-types";

export const CREATE_LIBRARY_KIND = "CreateLibraryType";

export interface CreateLibraryType {
  id: string;
  name: string;
  aspect: Aspect;
  objectType: ObjectType;
  purpose: string;
  semanticReference: string;
  rdsId: string;
  terminalTypes: unknown[];
  attributeTypes: string[];
  locationType: string;
  predefinedAttributes: PredefinedAttribute[];
  terminalTypeId: string;
  symbolId: string;
  kind: string;
}

export const defaultCreateLibraryType: CreateLibraryType = {
  id: null,
  name: "",
  aspect: Aspect.NotSet,
  objectType: ObjectType.NotSet,
  purpose: "",
  semanticReference: "",
  rdsId: "",
  terminalTypes: [] as unknown[],
  attributeTypes: [] as string[],
  locationType: "",
  predefinedAttributes: [] as PredefinedAttribute[],
  terminalTypeId: "",
  symbolId: "",
  kind: CREATE_LIBRARY_KIND,
};

export function fromJsonCreateLibraryType(createLibraryTypeJson: CreateLibraryType): CreateLibraryType {
  return ensureValidState({ ...defaultCreateLibraryType, ...createLibraryTypeJson });
}

function ensureValidState(newCreateLibraryType: CreateLibraryType) {
  const createLibraryTypeState = { ...newCreateLibraryType };

  if (!createLibraryTypeState.attributeTypes) createLibraryTypeState.attributeTypes = [];

  // TODO: fix

  // if (!createLibraryTypeState.terminalTypes) {
  //   const defaultTerminalTypeItem = {
  //     number: 1,
  //     terminalTypeId: createLibraryTypeState.terminalTypeId,
  //     connectorType: ConnectorDirection.Input,
  //   } as unknown;

  //   createLibraryTypeState.terminalTypes = [
  //     defaultTerminalTypeItem,
  //     { ...defaultTerminalTypeItem, connectorType: ConnectorDirection.Output },
  //   ];
  // }

  // Assign temporary-ids to items for handling CRUD in redux store
  // if (createLibraryTypeState.terminalTypes) {
  //   createLibraryTypeState.terminalTypes = createLibraryTypeState.terminalTypes.map((terminalTypeItem) => ({
  //     ...terminalTypeItem,
  //     terminalId: CreateId(),
  //   }));
  // }

  return createLibraryTypeState;
}
