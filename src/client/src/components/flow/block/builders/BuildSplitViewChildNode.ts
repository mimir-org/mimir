import { Node } from "../../../../models";
import { FlowElement } from "react-flow-renderer";
import { GetNodeTypeString, SetSplitViewNodePos } from "./helpers";

const BuildSplitViewChildNode = (node: Node, parent: Node) => {
  if (!node) return null;
  const type = GetNodeTypeString(node);

  // Force node to fit Block
  const position = SetSplitViewNodePos(node, parent);

  return {
    id: node.id,
    type: type,
    data: node,
    position: position,
    isHidden: false,
    isSelected: node.isSelected,
    draggable: true,
    selectable: true,
    connectable: true,
  } as FlowElement;
};

export default BuildSplitViewChildNode;
