import { EnumBase, Attribute, Aspect, Purpose } from "..";
import { Composite } from "../Types";
import Connector from "./Connector";

class Node {
  id: string;
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
  created: Date;
  updatedBy: string;
  updated: Date;
  version: string;
  aspect: Aspect;
  isRoot: boolean | false;
  masterProjectId: string;
  symbol: string;
  connectors: Connector[];
  attributes: Attribute[];
  composites: Composite[];

  // Only for location aspect
  length: number;
  width: number;
  height: number;

  // Required only for product aspect
  cost: number;

  // TODO: fix
  connectNodes: Node[];

  // Only for client
  isSelected: boolean | false;
  isBlockSelected: boolean | false;
  isHidden: boolean | false;

  area(): number {
    if (!this.length || !this.width) return 0;
    return this.length * this.width;
  }

  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor() {}
}

export default Node;
