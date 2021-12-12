import { Node } from "../../../../models";
import { FlowElement } from "react-flow-renderer";
import { GetNodeTypeString, SetBlockNodePos, SetOffPageNodePos, SetConnectorOrder } from "./helpers";
import { CreateId } from "../../helpers";
import { IsOffPage } from "../../../../helpers";

/**
 * Component to create a node in BlockView.
 * @param node
 * @returns a node of the type FlowElement.
 */
const BuildBlockNode = (node: Node, libOpen: boolean) => {
  if (!node) return null;

  const type = GetNodeTypeString(node);
  const nodePos = { x: node.positionBlockX, y: node.positionBlockY };

  SetConnectorOrder(node);

  // Force node to fit Block
  const position = !IsOffPage(node) ? SetBlockNodePos(nodePos, libOpen) : SetOffPageNodePos(nodePos);

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

export default BuildBlockNode;
