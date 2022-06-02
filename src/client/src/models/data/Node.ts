import { EnumBase } from "../enums/EnumBase";
import { Aspect } from "../enums/Aspect";
import { SimpleLibCm } from "@mimirorg/typelibrary-types";
import { Connector } from "..";
import { Attribute } from "./Attribute";

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
  purpose: string;
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
  simples: SimpleLibCm[];
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
