import { IsAspectNode } from "../../../../helpers/Aspects";
import { GetParentNode } from "../../../../helpers/Family";
import { Node } from "../../../../models";

/**
 * Component to assign a parentId to all nodes. This component runs on the first render of BlockView.
 * @param nodes
 */
const SetInitialParentId = (nodes: Node[]) => {
  nodes.forEach((n) => {
    if (IsAspectNode(n)) {
      n.parentNodeId = "";
      return;
    }
    const parent = GetParentNode(n.id);
    n.parentNodeId = parent ? parent.id : "";
  });
};

export default SetInitialParentId;
