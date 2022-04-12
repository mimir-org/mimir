import { Node as FlowNode } from "react-flow-renderer";
import { Node } from "../../../../../../models";

const IsNodeInBlockExplorerChecked = (flowNodes: FlowNode[], node: Node) => {
  if (!node) return false;

  let checked = false;

  flowNodes?.forEach((flowNode) => {
    if (node.id === flowNode?.id && !node.hidden) checked = true;
  });

  return checked;
};

export default IsNodeInBlockExplorerChecked;
