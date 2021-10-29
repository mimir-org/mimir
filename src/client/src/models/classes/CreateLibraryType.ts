import { Aspect, ObjectType, TerminalTypeItem, PredefinedAttribute } from "..";

export const CREATE_LIBRARY_KIND: string = "CreateLibraryType";

export class CreateLibraryType {
  id: string;
  name: string;
  aspect: Aspect;
  objectType: ObjectType;
  purpose: string;
  semanticReference: string;
  rdsId: string;
  terminalTypes: TerminalTypeItem[];
  attributeTypes: string[];
  locationType: string;
  predefinedAttributes: PredefinedAttribute[];
  terminalTypeId: string;
  symbolId: string;
  compositeTypes: string[];

  kind: string = CREATE_LIBRARY_KIND;

  constructor(createLibraryType: CreateLibraryType) {
    Object.assign(this, createLibraryType);
  }
}
