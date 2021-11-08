import { Node } from "../../../../models";
import { FlowElement } from "react-flow-renderer";
import { GetNodeTypeString, SetBlockNodePos, SetOffPageNodePos, SetConnectorOrder } from "./helpers";
import { CreateId } from "../../helpers";
import { BlockNodeSize } from "../../../../models/project";
import { IsOffPage } from "../../../../helpers";

/**
 * Component to create a node in BlockView.
 * @param node
 * @param parent
 * @param parentNodeSize
 * @returns a node of the type FlowElement.
 */
const BuildBlockNode = (node: Node, parent: Node, parentNodeSize: BlockNodeSize) => {
  if (!node || !parent) return null;
  const type = GetNodeTypeString(node);

  const nodePos = { x: node.positionBlockX, y: node.positionBlockY };
  const parentPos = { x: parent.positionBlockX, y: parent.positionBlockY };

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
    isHidden: false,
    isSelected: node.isSelected,
    draggable: true,
    selectable: true,
    connectable: true,
  } as FlowElement;
};

export default BuildBlockNode;
