import { FileFormat } from "./FileFormat";

export interface ProjectFileAm {
  parserId: string;
  fileContent: string;
  fileFormat: FileFormat | null;
}
