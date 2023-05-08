import { AspectObjectLibCm } from "@mimirorg/typelibrary-types";

export interface Collection {
  id: string;
  name: string;
  libNodes: AspectObjectLibCm[];
  created: Date;
}
