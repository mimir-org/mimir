import { Aspect, Connector, Attribute, ObjectType } from ".";
import { CommitStatus, ConnectorType, Discipline, SelectType } from "./Enums";

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
  description: string;
  selectValues: string[];
  selectType: SelectType;
  discipline: Discipline;
}

export interface EnumBase {
  id: string;
  name: string;
  description: string;
  semanticReference: string;
  color: string;
}

export interface Library {
  objectBlocks: LibItem[];
  interfaces: LibItem[];
  transports: LibItem[];
}

export interface LibItem {
  id: string;
  rds: string;
  category: string;
  name: string;
  aspect: Aspect;
  connectors: Connector[];
  attributes?: Attribute[] | null;
  composites?: Composite[] | null;
  semanticReference: string;
  statusId: string;
  version: string;
  symbolId: string;
  terminalId: string;
  terminalTypeId: string;
  libraryType: ObjectType;
  purpose: Purpose;
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
  terminalId: string;
  terminalTypeId: string;
  selected: boolean | false;
  connectorType: ConnectorType;
  number: number;
  categoryId: string;
}

export interface Purpose {
  id: string;
  name: string;
  discipline: Discipline;
  description: string;
  semanticReference: string;
}

export interface PredefinedAttribute {
  key: string;
  values: Object;
  isMultiSelect: boolean;
}

export interface LocationType {
  id: string;
  name: string;
  description: string;
  semanticReference: string;
  locationSubTypes: LocationType[];
}

export interface CreateLibraryType {
  libraryId: string;
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
}

export interface User {
  username: string;
  name: string;
}

export interface FileData {
  content: string;
  name: string;
  lastModified: number;
}

export interface BlobData {
  id: string;
  name: string;
  data: string;
  discipline: Discipline;
}

export interface Composite {
  id: string;
  name: string;
  semanticReference: string;
  attributes: Attribute[];
  nodeId: string;
}

export interface CompositeType {
  id: string;
  name: string;
  semanticReference: string;
  attributeTypes: AttributeType[];
}

export interface CommitPackage {
  projectId: string;
  commitStatus: CommitStatus;
  parser: string;
}

export interface CombinedAttribute {
  qualifierId: string;
  qualifier: string;
  sourceId: string;
  source: string;
  conditionId: string;
  condition: string;
  combined: string;
}

export interface CombinedAttributeFilter {
  name: string;
  combinedAttributes: CombinedAttribute[];
}

export const SETTING_KEY = {
  PREFERED_TYPE: "PREFERED_TYPE",
};

export const SETTING_VALUE = {
  TREE_VIEW: "TREE_VIEW",
  BLOCK_VIEW: "BLOCK_VIEW",
};
