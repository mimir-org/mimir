import { Node } from "../../../models";
import { FlowElement } from "react-flow-renderer";
import { SetBlockNodePosition, IsSplitView } from "../helpers/block";
import { IsFunction, IsLocation } from "../helpers/common";
import { Size } from "../../../compLibrary";
import { SetConnectNodePosition } from "../helpers/block/connectView";
import { TextResources } from "../../../assets/text";

const CreateBlockNode = (node: Node, connectNode: Node) => {
  if (!node) return null;

  const connectNodes = connectNode?.connectNodes ?? [];
  const type = IsLocation(node)
    ? TextResources.Type_BlockLocation
    : TextResources.Type_BlockFunction;

  // Force node to fit Block
  let position = SetBlockNodePosition(node, IsSplitView());
  if (connectNodes.some((x) => x.id === node.id)) {
    position = SetConnectNodePosition(node, connectNode.id, connectNodes);
  }

  // Handle size
  if (IsFunction(node)) {
    if (connectNode?.id === node.id) {
      node.width = Size.ConnectView_Width;
      node.length = Size.ConnectView_Length;
    }
  }

  if (!node.width) node.width = Size.Node_Width;
  if (!node.length) node.length = Size.Node_Length;

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

export default CreateBlockNode;
