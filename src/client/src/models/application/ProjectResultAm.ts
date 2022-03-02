import { Project } from "../data/Project";

export interface ProjectResultAm {
  project: Project;
  idChanges: { [id: string]: string };
}
