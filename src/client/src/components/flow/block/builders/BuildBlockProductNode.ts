import { Node } from "../../../../models";
import { FlowElement } from "react-flow-renderer";
import { GetNodeTypeString, SetBlockNodePos, SetConnectorOrder, SetOffPageNodePos } from "./helpers";
import { CreateId } from "../../helpers";
import { IsOffPage } from "../../../../helpers";
import { BlockNodeSize } from "../../../../models/project";

/**
 * Component to create a Product Node in BlockView.
 * @param node
 * @param parentNodeSize
 * @returns a Product Node of the type FlowElement.
 */
const BuildProductBlockNode = (node: Node, parentNodeSize: BlockNodeSize) => {
  if (!node) return null;
  const type = GetNodeTypeString(node);

  const nodePos = { x: node.positionBlockX, y: node.positionBlockY };
  const parentPos = { x: -125, y: -40 }; // TODO: fix hard-coded position

  SetConnectorOrder(node);

  // Force node to fit Block
  const position = !IsOffPage(node)
    ? SetBlockNodePos(nodePos, parentPos, parentNodeSize)
    : SetOffPageNodePos(nodePos, parentPos, parentNodeSize);

  return {
    key: CreateId(),
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

export default BuildProductBlockNode;
