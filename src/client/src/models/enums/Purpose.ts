import { Discipline } from "./Discipline";

export interface Purpose {
  id: string;
  name: string;
  discipline: Discipline;
  description: string;
  semanticReference: string;
}
