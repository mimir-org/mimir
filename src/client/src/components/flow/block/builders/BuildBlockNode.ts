import { Node } from "../../../../models";
import { FlowElement } from "react-flow-renderer";
import { IsOffPage } from "../helpers";
import { SetConnectNodePos } from "../connectView/helpers/position";
import { GetNodeTypeString, SetBlockNodePos, SetOffPageNodePos } from "./helpers";
import { CreateId } from "../../helpers";

/**
 * Component to create a node in BlockView.
 * @param node
 * @param connectNode
 * @param allNodes - all nodes in Mimir
 * @param parentNode
 * @returns a node of the type FlowElement.
 */
const BuildBlockNode = (node: Node, connectNode: Node, allNodes: Node[], parentNode: Node) => {
  if (!node) return null;

  const connectNodes = connectNode?.connectNodes ?? [];
  const type = GetNodeTypeString(node);

  // Force node to fit Block
  let position = !IsOffPage(node) ? SetBlockNodePos(node, parentNode) : SetOffPageNodePos(node, parentNode);

  if (connectNodes.some((n) => n.id === node.id))
    position = SetConnectNodePos(node, connectNode.id, connectNodes, allNodes);

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
