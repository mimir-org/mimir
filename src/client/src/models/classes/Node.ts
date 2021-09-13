import { EnumBase, Attribute, Aspect } from "..";
import { BlobData, Composite } from "../Types";
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

  positionBlockX: number;
  positionBlockY: number;
  level: number;
  order: number;
  statusId: string;
  status: EnumBase;
  updatedBy: string;
  updated: Date;
  version: string;
  aspect: Aspect;
  isRoot: boolean | false;
  masterProjectId: string;
  symbolId: string;
  symbol: BlobData;
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
