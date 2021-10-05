import { Node } from "../../../models";
import { FlowElement } from "react-flow-renderer";
import { IsLocation, IsProduct } from "../helpers";
import { Size } from "../../../compLibrary";
import { GetNodeTypeString, SetSplitViewNodePosition } from "./helpers";

const CreateSplitViewNode = (node: Node) => {
  if (!node) return null;
  const type = GetNodeTypeString(node);

  // Force node to fit Block
  const position = SetSplitViewNodePosition(node);

  if (IsLocation(node) || IsProduct(node)) {
    if (!node.width) node.width = Size.Node_Width;
    if (!node.length) node.length = Size.Node_Length;
    node.height = 0; // Z-axis
  }

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
