import { Node } from "../../../../models";
import { FlowElement } from "react-flow-renderer";
import { GetNodeTypeString, SetSecondaryNodePos } from "./helpers";
import { CreateId } from "../../helpers";
import { IsOffPage } from "../../../../helpers";
import { BlockNodeSize } from "../../../../models/project";

const BuildSecondaryChildNode = (node: Node, parentNodeSize: BlockNodeSize) => {
  if (!node) return null;

  const type = GetNodeTypeString(node);
  const nodePos = { x: node.positionBlockX, y: node.positionBlockY };

  // Force node to fit Block
  const position = !IsOffPage(node) ? SetSecondaryNodePos(nodePos, parentNodeSize) : nodePos;

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
