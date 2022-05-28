import { Node as FlowNode } from "react-flow-renderer";
import { Node } from "../../../../models";
import { GetNodeTypeString, SetSecondaryChildNodePos } from "./helpers";
import { IsOffPage } from "../../../../helpers/Aspects";

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
  const type = GetNodeTypeString(secondaryNode);
  const nodePos = { x: childNode.positionBlockX, y: childNode.positionBlockY };
  const position = !IsOffPage(secondaryNode) ? SetSecondaryChildNodePos(primaryNode, secondaryNode, nodePos) : nodePos;

  return {
    id: childNode.id,
    type: type,
    data: childNode,
    position: position,
    hidden: childNode.blockHidden,
    selected: childNode.selected,
    draggable: true,
    selectable: true,
    connectable: true,
  } as FlowNode;
};

export default BuildFlowSecondaryChildNode;
