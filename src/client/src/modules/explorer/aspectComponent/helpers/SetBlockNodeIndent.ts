import { IsAspectNode } from "../../../../helpers";
import { Node } from "../../../../models";

const SetBlockNodeIndent = (node: Node, indent: number) => {
  let blockIndent = 0;
  blockIndent = IsAspectNode(node) ? indent - 1 : indent + 1;

  return blockIndent;
};

export default SetBlockNodeIndent;
