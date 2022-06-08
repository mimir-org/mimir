import { Project } from "@mimirorg/modelbuilder-types";

export interface ProjectResultAm {
  project: Project;
  idChanges: { [id: string]: string };
}
