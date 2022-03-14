import { Node } from "../../../../models";
import { FlowElement } from "react-flow-renderer";
import { GetNodeTypeString, SetChildNodePosition } from "./helpers";
import { CreateId } from "../../helpers";
import { IsOffPage } from "../../../../helpers";
import { BlockNodeSize } from "../../../../models/project";

/**
 * Component to create a child node in BlockView.
 * @param node
 * @returns a node thtat sits inside the container of the ParentNode.
 */
const BuildChildNode = (node: Node, parentNodeSize: BlockNodeSize) => {
  if (!node) return null;

  const type = GetNodeTypeString(node);
  const nodePos = { x: node.positionBlockX, y: node.positionBlockY };
  const position = !IsOffPage(node) ? SetChildNodePosition(nodePos, parentNodeSize) : nodePos;

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
