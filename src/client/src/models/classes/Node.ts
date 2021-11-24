import { EnumBase, Attribute, Aspect, Purpose, Composite } from "..";
import Connector from "./Connector";

export const NODE_KIND: string = "Node";

class Node {
  id: string;
  iri: string;
  domain: string;
  rds: string;
  contractor: string;
  description: string;
  semanticReference: string;
  tagNumber: string;
  name: string;
  label: string;
  positionX: number;
  positionY: number;
  isLocked: boolean | false;
  isLockedBy: string;
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
  isRoot: boolean | false;
  masterProjectId: string;
  masterProjectIri: string;
  symbol: string;
  connectors: Connector[];
  attributes: Attribute[];
  composites: Composite[];
  width: number;
  height: number;

  // Required only for product aspect
  cost: number;

  // Only for client
  isSelected: boolean | false;
  isBlockSelected: boolean | false;
  isHidden: boolean | false;
  blockWidth: number;
  blockHeight: number;

  kind: string = NODE_KIND;

  constructor(node: Node) {
    Object.assign(this, node);
  }
}

export default Node;
