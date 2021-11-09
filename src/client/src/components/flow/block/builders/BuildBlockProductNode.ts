import { Node } from "../../../../models";
import { FlowElement } from "react-flow-renderer";
import { GetNodeTypeString, SetConnectorOrder } from "./helpers";
import { CreateId } from "../../helpers";

/**
 * Component to create a Product Node in BlockView.
 * @param node
 * @returns a node of the type FlowElement.
 */
const BuildBlockNode = (node: Node) => {
  if (!node) return null;
  const type = GetNodeTypeString(node);

  const position = { x: node.positionBlockX, y: node.positionBlockY };

  SetConnectorOrder(node);

  return {
    key: CreateId(),
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

export default BuildBlockNode;
