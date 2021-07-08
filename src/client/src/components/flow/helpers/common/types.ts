import { Connector, Node, RelationType } from "../../../../models";

export interface FilterElement {
  id: string;
  type: RelationType | string;
  conn: Connector;
  name: string;
  fromNode?: Node;
}

export interface GetCenterParams {
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
}
export interface Legend {
  key: string;
  name: string;
  color: string;

  // TODO: En type striplet, pil etc.
}
