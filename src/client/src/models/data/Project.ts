import { Edge } from "./Edge";
import { Node } from "./Node";

export interface Project {
  id: string;
  iri: string;
  domain: string;
  version: string;
  name: string;
  isSubProject: boolean;
  description: string;
  projectOwner: string;
  updatedBy: string;
  updated: Date;
  nodes: Node[];
  edges: Edge[];
}
