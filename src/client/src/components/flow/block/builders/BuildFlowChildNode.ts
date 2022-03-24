import { Node } from "../../../../models";
import { FlowElement } from "react-flow-renderer";
import { GetNodeTypeString, SetChildNodePos, SetOffPageNodePos } from "./helpers";
import { CreateId } from "../../helpers";
import { IsOffPage } from "../../../../helpers";

/**
 * Component to create a child node in BlockView.
 * This component creates a FlowElement that contains the basic data for a node.
 * On top of the FlowNode a layer with Mimir functionality is created. See the BlockNode component.
 * @param childNode
 * @param parentNode
 * @returns a node that sits inside the container of the ParentNode.
 */
const BuildFlowChildNode = (childNode: Node, parentNode: Node) => {
  if (!childNode) return null;

  const type = GetNodeTypeString(childNode);
  const nodePos = { x: childNode.positionBlockX, y: childNode.positionBlockY };
  const position = IsOffPage(childNode) ? SetOffPageNodePos(childNode, parentNode) : SetChildNodePos(nodePos, parentNode);

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

export default BuildFlowChildNode;
