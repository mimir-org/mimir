import { Node as FlowNode } from "react-flow-renderer";
import { Node } from "@mimirorg/modelbuilder-types";
import { GetNodeTypeString, SetChildNodePos, SetOffPageNodePos } from "./helpers";
import { IsOffPage } from "../../../../helpers/Aspects";

/**
 * Component to create a child node in BlockView.
 * This component creates a FlowElement that contains the basic data for a node.
 * On top of the FlowNode a layer with Mimir functionality is created. See the BlockNode component.
 * @param childNode
 * @param parentNode
 * @param secondaryNode
 * @param nodes
 * @param isElectroView
 * @returns a node that sits inside the container of the ParentNode.
 */
const BuildFlowChildNode = (childNode: Node, parentNode: Node, secondaryNode: Node, nodes: Node[], isElectroView: boolean) => {
  if (!childNode) return null;

  const type = GetNodeTypeString(childNode);
  const nodePos = { x: childNode.positionBlockX, y: childNode.positionBlockY };

  const position = IsOffPage(childNode)
    ? SetOffPageNodePos(childNode, parentNode, secondaryNode, nodes, isElectroView)
    : SetChildNodePos(nodePos, parentNode);

  return {
    id: childNode.id,
    type,
    data: childNode,
    position,
    hidden: false,
    selected: childNode.selected,
    draggable: true,
    selectable: true,
    connectable: true,
    parentNode: parentNode.id,
  } as FlowNode;
};

export default BuildFlowChildNode;
