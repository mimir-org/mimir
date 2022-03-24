import { LibItem } from "../application/LibItem";

export interface Collection {
  id: string;
  name: string;
  libItems: LibItem[];
  created: Date;
}
