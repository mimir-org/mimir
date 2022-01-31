import { Node } from "../../../../models";
import { FlowElement } from "react-flow-renderer";
import { GetNodeTypeString, SetNodePos } from "./helpers";
import { CreateId } from "../../helpers";
import { IsOffPage } from "../../../../helpers";

/**
 * Component to create a Product Node in BlockView.
 * @param node
 * @param libOpen
 * @param explorerOpen
 * @param splitView
 * @returns a Product Node of the type FlowElement.
 */
const BuildProductChildNode = (node: Node, libOpen: boolean, explorerOpen: boolean, splitView: boolean) => {
  if (!node) return null;
  const type = GetNodeTypeString(node);

  const nodePos = { x: node.positionBlockX, y: node.positionBlockY };

  // Force node to fit Block
  const position = !IsOffPage(node) ? SetNodePos(nodePos, libOpen, explorerOpen, splitView) : nodePos;

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

export default BuildProductChildNode;
