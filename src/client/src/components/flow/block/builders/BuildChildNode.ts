import { Node } from "../../../../models";
import { FlowElement } from "react-flow-renderer";
import { GetNodeTypeString, SetNodePos } from "./helpers";
import { CreateId } from "../../helpers";
import { IsOffPage, IsProduct } from "../../../../helpers";

/**
 * Component to create a child node in BlockView.
 * @param node
 * @param splitView
 * @returns a node of the type FlowElement.
 */
const BuildChildNode = (node: Node, splitView: boolean) => {
  if (!node) return null;

  const type = GetNodeTypeString(node);
  const isProduct = IsProduct(node);
  const isOffPage = IsOffPage(node);
  const nodePos = { x: node.positionBlockX, y: node.positionBlockY };

  // Force node to fit Block
  const position = !isOffPage ? SetNodePos(nodePos, splitView, isProduct) : nodePos;

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
