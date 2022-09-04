import { FileFormat } from "@mimirorg/modelbuilder-types";

export interface ProjectFileAm {
  parserId: string;
  fileContent: string;
  fileFormat: FileFormat | null;
}
