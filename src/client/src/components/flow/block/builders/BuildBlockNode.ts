import { Node } from "../../../../models";
import { FlowElement } from "react-flow-renderer";
import { IsOffPage } from "../helpers";
import { SetConnectNodePos } from "../connectView/helpers/position";
import { GetNodeTypeString, SetBlockNodePos, SetOffPageNodePos, SetConnectorOrder } from "./helpers";
import { CreateId } from "../../helpers";

/**
 * Component to create a node in BlockView.
 * @param node
 * @param connectNode
 * @param allNodes - all nodes in Mimir
 * @param parent
 * @returns a node of the type FlowElement.
 */
const BuildBlockNode = (node: Node, connectNode: Node, allNodes: Node[], parent: Node) => {
  if (!node || !parent) return null;
  const type = GetNodeTypeString(node);
  const connectNodes = connectNode?.connectNodes ?? [];

  const nodePos = { x: node.positionBlockX, y: node.positionBlockY };
  const parentPos = { x: parent.positionBlockX, y: parent.positionBlockY };

  SetConnectorOrder(node);

  // Force node to fit Block
  let position = !IsOffPage(node) ? SetBlockNodePos(nodePos, parentPos) : SetOffPageNodePos(nodePos, parentPos);
  if (connectNodes.some((n) => n.id === node.id)) position = SetConnectNodePos(node, connectNode.id, connectNodes, allNodes);

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

export default BuildBlockNode;
