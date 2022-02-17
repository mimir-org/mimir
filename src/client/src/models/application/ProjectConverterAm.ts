import { ProjectAm } from "../../redux/sagas/project/ConvertProject";

export interface ProjectConverterAm {
  parserId: string;
  project: ProjectAm;
  filename: string;
}
