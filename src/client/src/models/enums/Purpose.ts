import { Discipline } from "@mimirorg/modelbuilder-types";

export interface Purpose {
  id: string;
  name: string;
  discipline: Discipline;
  description: string;
  semanticReference: string;
}
