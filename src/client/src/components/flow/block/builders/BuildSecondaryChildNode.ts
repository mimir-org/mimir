import { Node } from "../../../../models";
import { FlowElement } from "react-flow-renderer";
import { GetNodeTypeString, SetBlockNodePos, SetConnectorOrder, SetOffPageNodePos } from "./helpers";
import { IsOffPage } from "../helpers";
import { CreateId } from "../../helpers";

const BuildSecondaryChildNode = (node: Node, parent: Node, parentNodeWidth: number) => {
  if (!node) return null;
  const type = GetNodeTypeString(node);

  const nodePos = { x: node.positionBlockX, y: node.positionBlockY };
  const parentPos = { x: parent.positionBlockX, y: parent.positionBlockY };

  SetConnectorOrder(node);

  // Force node to fit Block
  const position = !IsOffPage(node)
    ? SetBlockNodePos(nodePos, parentPos, parentNodeWidth)
    : SetOffPageNodePos(nodePos, parentPos);

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

export default BuildSecondaryChildNode;
