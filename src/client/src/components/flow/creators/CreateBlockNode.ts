import { Node } from "../../../models";
import { FlowElement } from "react-flow-renderer";
import { IsSplitView } from "../block/helpers";
import { SetConnectNodePos } from "../block/connectView/helpers/position";
import { GetNodeTypeString, SetBlockNodePos } from "./helpers";

/**
 * Component to create a node in BlockView.
 * @param node
 * @param connectNode
 * @param allNodes - all nodes in Mimir
 * @returns a node of the type FlowElement.
 */
const CreateBlockNode = (node: Node, connectNode: Node, allNodes: Node[]) => {
  if (!node) return null;

  const connectNodes = connectNode?.connectNodes ?? [];
  const type = GetNodeTypeString(node);

  // Force node to fit Block
  let position = SetBlockNodePos(node, IsSplitView());

  if (connectNodes.some((n) => n.id === node.id))
    position = SetConnectNodePos(node, connectNode.id, connectNodes, allNodes);

  return {
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

export default CreateBlockNode;
