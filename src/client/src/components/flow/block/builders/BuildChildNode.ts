import { Node } from "../../../../models";
import { FlowElement } from "react-flow-renderer";
import { GetNodeTypeString, SetNodePos, SetOffPageNodePos, SetConnectorOrder } from "./helpers";
import { CreateId } from "../../helpers";
import { IsOffPage } from "../../../../helpers";

/**
 * Component to create a child node in BlockView.
 * @param node
 * @param libOpen
 * @param explorerOpen
 * @param secondaryNode
 * @returns a node of the type FlowElement.
 */
const BuildChildNode = (node: Node, libOpen: boolean, explorerOpen: boolean, secondaryNode: boolean) => {
  if (!node) return null;

  const type = GetNodeTypeString(node);
  const nodePos = { x: node.positionBlockX, y: node.positionBlockY };

  SetConnectorOrder(node);

  // Force node to fit Block
  const position = !IsOffPage(node) ? SetNodePos(nodePos, libOpen, explorerOpen, secondaryNode) : SetOffPageNodePos(nodePos);

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

export default BuildChildNode;
