import { LibItem } from "./LibItem";

export interface Library {
  objectBlocks: LibItem[];
  interfaces: LibItem[];
  transports: LibItem[];
}
