import { Project } from "@mimirorg/modelbuilder-types";

export const CreateEmptyProject = () => {
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
  } as Project;
};
