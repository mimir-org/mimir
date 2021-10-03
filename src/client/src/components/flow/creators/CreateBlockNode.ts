import { Node } from "../../../models";
import { FlowElement } from "react-flow-renderer";
import { SetBlockNodePosition, IsSplitView } from "../block/helpers";
import { IsLocation } from "../helpers";
import { SetConnectNodePosition } from "../block/connectView/helpers";
import { TextResources } from "../../../assets/text";

/**
 * Component to create a node in BlockView.
 * @param node
 * @param connectNode
 * @param nodes
 * @returns a node of the type FlowElement.
 */
const CreateBlockNode = (node: Node, connectNode: Node, nodes: Node[]) => {
  if (!node) return null;

  const connectNodes = connectNode?.connectNodes ?? [];
  const type = IsLocation(node)
    ? TextResources.Type_BlockLocation
    : TextResources.Type_BlockFunction;

  // Force node to fit Block
  let position = SetBlockNodePosition(node, IsSplitView());
  if (connectNodes.some((x) => x.id === node.id)) {
    position = SetConnectNodePosition(node, connectNode.id, connectNodes, nodes);
  }

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
