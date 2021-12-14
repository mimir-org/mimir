import { Edge, Node } from "../../../../models";
import { FlowElement } from "react-flow-renderer";
import { GetNodeTypeString, SetSecondaryNodePos, SetConnectorOrder, SetOffPageNodePos } from "./helpers";
import { CreateId } from "../../helpers";
import { IsOffPage } from "../../../../helpers";

const BuildSecondaryChildNode = (node: Node, secondaryNode: Node, libOpen: boolean, explorerOpen: boolean, edges: Edge[]) => {
  if (!node) return null;

  const type = GetNodeTypeString(node);
  const nodePos = { x: node.positionBlockX, y: node.positionBlockY };

  SetConnectorOrder(node);

  // Force node to fit Block
  const position = !IsOffPage(node)
    ? SetSecondaryNodePos(nodePos, libOpen, explorerOpen)
    : SetOffPageNodePos(node, libOpen, explorerOpen, secondaryNode, edges);

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

export default BuildSecondaryChildNode;
