import { Attribute } from "./Attribute";

export const SIMPLE_KIND = "Simple";

export interface Simple {
  id: string;
  name: string;
  semanticReference: string;
  attributes: Attribute[];
  nodeId: string;
  kind: string;
}
