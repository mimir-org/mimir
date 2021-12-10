import { Node } from "../../../../models";
import { FlowElement } from "react-flow-renderer";
import { GetNodeTypeString, SetBlockNodePos, SetOffPageNodePos, SetConnectorOrder } from "./helpers";
import { CreateId, GetParent } from "../../helpers";
import { IsOffPage } from "../../../../helpers";

/**
 * Component to create a node in BlockView.
 * @param node
 * @returns a node of the type FlowElement.
 */
const BuildBlockNode = (node: Node) => {
  const parent = GetParent(node);
  if (!node || !parent) return null;

  const type = GetNodeTypeString(node);
  const nodePos = { x: node.positionBlockX, y: node.positionBlockY };

  SetConnectorOrder(node);

  // Force node to fit Block
  const position = !IsOffPage(node) ? SetBlockNodePos(nodePos) : SetOffPageNodePos(nodePos);

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
