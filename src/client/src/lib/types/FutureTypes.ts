import { Direction } from "./enums/Direction";
import { Aspect } from "./enums/AspectType";

export interface UnitCm {
  id: string;
  type: string;
  name: string;
  symbol: string;
}

export interface DatumCm {
  id: string;
  name: string;
  value: string;
}

export interface TypeReferenceSubCm {
  id: string;
  name: string;
  isDefault: boolean;
}

export interface TypeReferenceCm {
  id: string;
  name: string;
  source: string;
  subs: TypeReferenceSubCm[];
}

export interface AttributeCm {
  id: string;
  name: string;
  value: string | null;
  attributeType: string;
  isLocked: boolean;
  IsLockedStatusBy: string | null;
  IsLockedStatusDate: Date | null;
  selectedUnit: string | null;
  datums: DatumCm[] | null;
  units: UnitCm[] | null;
  terminal: string | null; // Remove in cm model?
  aspectObject: string | null; // Remove in cm model?
}

export interface ConnectorCm {
  id: string;
  name: string;
  direction: Direction;
  aspectObject: string;
  terminalType: string;
  terminalParentType: string | null;
  inside: string;
  outside: string;
}

export interface ConnectorTerminalCm extends ConnectorCm {
  color: string;
  attributes: AttributeCm[] | null;
  typeReferences: TypeReferenceCm[] | null;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ConnectorRelationCm extends ConnectorCm {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ConnectorPartOfCm extends ConnectorRelationCm {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ConnectorFulfilledByCm extends ConnectorRelationCm {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ConnectorHasLocationCm extends ConnectorRelationCm {}

export interface ConnectionCm {
  id: string;
  fromConnector: string;
  toConnector: string;
  mainProject: string;
  project: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ConnectionTerminalCm extends ConnectionCm {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ConnectionRelationCm extends ConnectionCm {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ConnectionPartOfCm extends ConnectionRelationCm {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ConnectionFulfilledByCm extends ConnectionRelationCm {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ConnectionHasLocationCm extends ConnectionRelationCm {}

export interface AspectObjectCm {
  id: string;
  rds: string;
  description: string;
  typeReferences: TypeReferenceCm[] | null;
  name: string;
  label: string;
  threePosX: number;
  threePosY: number;
  blockPosX: number;
  blockPosY: number;
  updated: Date | null;
  updatedBy: string | null;
  created: Date;
  createdBy: string;
  libraryType: string;
  version: string;
  aspect: Aspect;
  mainProject: string;
  symbol: string;
  purpose: string;
  project: string;
  attributes: AttributeCm[] | null;
  connectors: ConnectorCm[] | null;
}

export interface ProjectCm {
  id: string;
  isSubProject: boolean;
  version: string;
  name: string;
  description: string;
  updated: Date | null;
  updatedBy: string | null;
  created: Date;
  createdBy: string;
  aspectObjects: AspectObjectCm[] | null;
  connections: ConnectionCm[] | null;
}
