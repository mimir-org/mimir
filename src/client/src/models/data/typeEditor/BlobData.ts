import { Discipline } from "@mimirorg/modelbuilder-types";

export interface BlobData {
  id: string;
  name: string;
  data: string;
  discipline: Discipline;
}
