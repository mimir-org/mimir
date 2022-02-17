import { Discipline } from "../../enums/Discipline";

export interface BlobData {
  id: string;
  name: string;
  data: string;
  discipline: Discipline;
}
