import { Attribute } from "./Attribute";

export const SIMPLE_KIND = "Simple";

export interface Simple {
  id: string;
  iri: string;
  name: string;
  attributes: Attribute[];
  nodeId: string;
  nodeIri: string;
  kind: string;
}
