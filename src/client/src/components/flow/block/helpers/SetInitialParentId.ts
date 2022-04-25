import { IsAspectNode } from "../../../../helpers/Aspects";
import { GetParentNode } from "../../../../helpers/Family";
import { Node } from "../../../../models";

const SetInitialParentId = (nodes: Node[]) => {
  nodes.forEach((n) => {
    // if (n.parentNodeId !== undefined && n.parentNodeId !== null) return;

    if (IsAspectNode(n)) {
      n.parentNodeId = "";
      return;
    }
    const parent = GetParentNode(n.id);
    n.parentNodeId = parent ? parent.id : "";
  });
};

export default SetInitialParentId;
