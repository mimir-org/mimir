import { Purpose } from "../enums/Purpose";
import { EnumBase } from "../enums/EnumBase";
import { Aspect } from "../enums/Aspect";
import { Connector } from "./Connector";
import { Attribute } from "./Attribute";
import { Simple } from "./Simple";

export const NODE_KIND = "Node";

export interface Node {
  id: string;
  iri: string;
  domain: string;
  projectId: string;
  projectIri: string;
  rds: string;
  description: string;
  semanticReference: string;
  tagNumber: string;
  name: string;
  label: string;
  positionX: number;
  positionY: number;
  purpose: Purpose;
  positionBlockX: number;
  positionBlockY: number;
  level: number;
  order: number;
  statusId: string;
  status: EnumBase;
  createdBy: string;
  libraryTypeId: string;
  created: Date;
  updatedBy: string;
  updated: Date;
  version: string;
  aspect: Aspect;
  isRoot: boolean;
  masterProjectId: string;
  masterProjectIri: string;
  symbol: string;
  connectors: Connector[];
  attributes: Attribute[];
  simples: Simple[];
  width: number;
  height: number;
  isLocked: boolean;
  isLockedStatusBy: string;
  isLockedStatusDate: string;
  kind: string;

  // Only for client
  parentNodeId: string;
  selected?: boolean;
  blockSelected?: boolean;
  hidden?: boolean;
  blockHidden?: boolean;
  isOffPageTarget?: boolean;
  isOffPageRequired?: boolean;
}
