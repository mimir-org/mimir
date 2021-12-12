import { Node } from "../../../../models";
import { FlowElement } from "react-flow-renderer";
import { GetNodeTypeString, SetConnectorOrder } from "./helpers";
import { CreateId } from "../../helpers";

const BuildSecondaryChildNode = (node: Node, parent: Node) => {
  if (!node) return null;
  const type = GetNodeTypeString(node);

  const nodePos = { x: node.positionBlockX, y: node.positionBlockY };
  // const parentPos = { x: parent.positionBlockX, y: parent.positionBlockY };

  SetConnectorOrder(node);

  // Force node to fit Block
  // const position = !IsOffPage(node)
  //   ? SetBlockNodePos(nodePos, parentPos, parentNodeSize)
  //   : SetOffPageNodePos(nodePos, parentNodeSize);

  return {
    key: CreateId(),
    id: node.id,
    type: type,
    data: node,
    position: nodePos,
    isHidden: node.isHidden,
    isSelected: node.isSelected,
    draggable: true,
    selectable: true,
    connectable: true,
  } as FlowElement;
};

export default BuildSecondaryChildNode;
