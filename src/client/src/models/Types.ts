import { Aspect, Connector, Status, Attribute, ObjectType } from ".";
import { ConnectorType } from "./Enums";

export interface AttributeType {
  id: string;
  entity: string;
  aspect: Aspect;
  qualifierId: string;
  qualifier: EnumBase;
  sourceId: string;
  source: EnumBase;
  conditionId: string;
  condition: EnumBase;
  formatId: string;
  format: EnumBase;
  units: EnumBase[];
}

export interface EnumBase {
  id: string;
  name: string;
  description: string;
  semanticReference: string;
  color: string;
}

export interface LibraryNodeItem {
  id: string;
  rds: string;
  category: string;
  name: string;
  status: Status;
  aspect: Aspect;
  connectors: Connector[];
  attributes?: Attribute[] | null;
  semanticReference: string;
}

export interface ProjectSimple {
  id: string;
  name: string;
  description: string;
  projectOwner: string;
  updated: Date;
  updatedBy: string;
  selected: boolean;
}

export interface Rds {
  id: string;
  name: string;
  code: string;
  rdsCategoryId: string;
  rdsCategory: EnumBase;
  semanticReference: string;
  aspect: Aspect;
}

export interface TerminalType {
  id: string;
  name: string;
  color: string;
  terminalCategoryId: string;
  terminalCategory: EnumBase;
  semanticReference: string;
}

export interface TerminalTypeItem {
  terminalTypeId: string;
  number: number;
  connectorType: ConnectorType;
}

export interface CreateLibraryType {
  name: string;
  status: Status;
  aspect: Aspect;
  objectType: ObjectType;
  semanticReference: string;
  rdsId: string;
  terminalTypes: TerminalTypeItem[];
  attributeTypes: string[];
  terminalTypeId: string;
}
