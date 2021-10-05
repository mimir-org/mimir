import { Node } from "../../../models";
import { FlowElement } from "react-flow-renderer";
import { GetNodeTypeString, SetSplitViewNodePosition } from "./helpers";

const CreateSplitViewNode = (node: Node) => {
  if (!node) return null;
  const type = GetNodeTypeString(node);

  // Force node to fit Block
  const position = SetSplitViewNodePosition(node);

  return {
    id: node.id,
    type: type,
    data: node,
    position: position,
    isHidden: node.isHidden,
    isSelected: node.isSelected,
    draggable: true,
    selectable: true,
    connectable: true,
  } as FlowElement;
};

export default CreateSplitViewNode;
