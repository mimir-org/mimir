import { Node } from "../../../../models";
import { FlowElement } from "react-flow-renderer";
import { GetNodeTypeString, SetNodePos } from "./helpers";
import { CreateId } from "../../helpers";
import { IsOffPage, IsProduct } from "../../../../helpers";
import { Size } from "../../../../compLibrary/size";

/**
 * Component to create a child node in BlockView.
 * @param node
 * @param libOpen
 * @param explorerOpen
 * @param splitView
 * @returns a node of the type FlowElement.
 */
const BuildChildNode = (node: Node, libOpen: boolean, explorerOpen: boolean, splitView: boolean) => {
  if (!node) return null;

  const type = GetNodeTypeString(node);
  const isProduct = IsProduct(node);
  const isOffPage = IsOffPage(node);
  let nodePos = { x: node.positionBlockX, y: node.positionBlockY };
  if (isProduct && isOffPage) nodePos = { x: Size.BLOCK_PRODUCT_WIDTH, y: node.positionBlockY };

  // Force node to fit Block
  const position = !isOffPage ? SetNodePos(nodePos, libOpen, explorerOpen, splitView, isProduct) : nodePos;

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
