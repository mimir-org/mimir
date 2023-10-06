import { BlockLibCm } from "@mimirorg/typelibrary-types";

export interface Collection {
  id: string;
  name: string;
  libNodes: BlockLibCm[];
  created: Date;
}
