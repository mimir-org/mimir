import { Node } from "../../../../models";
import { FlowElement } from "react-flow-renderer";
import { GetNodeTypeString, SetSecondaryChildNodePos } from "./helpers";
import { CreateId } from "../../helpers";
import { IsOffPage } from "../../../../helpers";

/**
 * Component to create a child node for the SecondaryParentNode in BlockView.
 * This component creates a FlowElement that contains the basic data for a node.
 * On top of the FlowNode a layer with Mimir functionality is created. See the BlockNode component.
 * @param primaryNode
 * @param secondaryNode
 * @param childNode
 * @returns a node that sits inside the container of the ParentSecondaryNode.
 */
const BuildFlowSecondaryChildNode = (primaryNode: Node, secondaryNode: Node, childNode: Node) => {
  if (!secondaryNode) return null;

  const type = GetNodeTypeString(secondaryNode);
  const nodePos = { x: childNode.positionBlockX, y: childNode.positionBlockY };
  const position = !IsOffPage(secondaryNode) ? SetSecondaryChildNodePos(primaryNode, secondaryNode, nodePos) : nodePos;

  return {
    key: CreateId(),
    id: childNode.id,
    type: type,
    data: childNode,
    position: position,
    isHidden: childNode.isHidden,
    isSelected: childNode.isSelected,
    draggable: true,
    selectable: true,
    connectable: true,
  } as FlowElement;
};

export default BuildFlowSecondaryChildNode;
