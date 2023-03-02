import { NodeLibCm } from "@mimirorg/typelibrary-types";

export interface Collection {
  id: string;
  name: string;
  libNodes: NodeLibCm[];
  created: Date;
}
