import { EnumBase, Attribute, Aspect } from "..";
import { BlobData } from "../Types";
import Connector from "./Connector";

class Node {
  id: string;
  rds: string;
  contractor: string;
  semanticReference: string;
  tagNumber: string;
  description: string;
  name: string;
  label: string;
  positionX: number;
  positionY: number;
  isLocked: boolean | false;
  isSelected: boolean | false;
  isBlockSelected: boolean | false;
  isHidden: boolean | false;
  positionBlockX: number;
  positionBlockY: number;
  level: number;
  order: number;
  statusId: string;
  status: EnumBase;
  updatedBy: string;
  updated: Date;
  version: string;
  attributes: Attribute[];
  connectors: Connector[];
  area: number;
  aspect: Aspect;
  isRoot: boolean | false;
  symbolId: string;
  symbol: BlobData;

  // TODO: fix
  connectNodes: Node[];

  // Only for location aspect
  length: number;
  width: number;
  height: number;

  masterProjectId: string;

  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor() {}
}

export default Node;
