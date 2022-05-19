import { Node as FlowNode } from "react-flow-renderer";
import { Node } from "../../../../models";
import { GetNodeTypeString, SetChildNodePos, SetOffPageNodePos } from "./helpers";
import { CreateId } from "../../helpers";
import { IsOffPage } from "../../../../helpers/Aspects";

/**
 * Component to create a child node in BlockView.
 * This component creates a FlowElement that contains the basic data for a node.
 * On top of the FlowNode a layer with Mimir functionality is created. See the BlockNode component.
 * @param childNode
 * @param parentNode
 * @param secondaryNode
 * @param nodes
 * @returns a node that sits inside the container of the ParentNode.
 */
const BuildFlowChildNode = (childNode: Node, parentNode: Node, secondaryNode: Node, nodes: Node[]) => {
  if (!childNode) return null;

  const type = GetNodeTypeString(childNode);
  const nodePos = { x: childNode.positionBlockX, y: childNode.positionBlockY };

  const position = IsOffPage(childNode)
    ? SetOffPageNodePos(childNode, parentNode, secondaryNode, nodes)
    : SetChildNodePos(nodePos, parentNode);

  return {
    key: CreateId(),
    id: childNode.id,
    type: type,
    data: childNode,
    position: position,
    hidden: childNode.blockHidden,
    selected: childNode.blockSelected,
    draggable: true,
    selectable: true,
    connectable: true,
    parentNode: parentNode.id,
  } as FlowNode;
};

export default BuildFlowChildNode;
