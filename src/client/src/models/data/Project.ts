import { Edge, Node } from "@mimirorg/modelbuilder-types";

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

export const CreateEmptyProject = (): Project => {
  return {
    id: "",
    iri: "",
    domain: "",
    version: "",
    name: "Project",
    isSubProject: false,
    description: "",
    projectOwner: "",
    updatedBy: "",
    updated: new Date(),
    nodes: [],
    edges: [],
  };
};
