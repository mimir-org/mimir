import { Size } from "../../../../../compLibrary/size";
import { Node } from "../../../../../models";

export const GetWidth = (nodes: Node[]) => {
  if (nodes.find((n) => n.level > 2 || n.name.length > 28)) {
    return 500;
  } else {
    return Size.ModuleOpen;
  }
};
