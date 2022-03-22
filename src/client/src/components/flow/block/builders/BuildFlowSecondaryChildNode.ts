import { Node } from "../../../../models";
import { FlowElement } from "react-flow-renderer";
import { GetNodeTypeString, SetChildNodePosition } from "./helpers";
import { CreateId } from "../../helpers";
import { IsOffPage } from "../../../../helpers";
import { BlockNodeSize } from "../../../../models/project";

/**
 * Component to create a child node for the SecondaryParentNode in BlockView.
 * This component creates a FlowElement that contains the basic data for a node.
 * On top of the FlowNode a layer with Mimir functionality is created. See the BlockNode component.
 * @param node
 * @param size
 * @returns a node that sits inside the container of the ParentSecondaryNode.
 */
const BuildFlowSecondaryChildNode = (node: Node, size: BlockNodeSize) => {
  if (!node) return null;

  const type = GetNodeTypeString(node);
  const nodePos = { x: node.positionBlockX, y: node.positionBlockY };
  const position = !IsOffPage(node) ? SetChildNodePosition(nodePos, size, true) : nodePos;

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

export default BuildFlowSecondaryChildNode;
