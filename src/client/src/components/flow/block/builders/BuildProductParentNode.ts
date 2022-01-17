import { FlowElement } from "react-flow-renderer";
import { TextResources } from "../../../../assets/text";
import { Node } from "../../../../models";
import { CreateId } from "../../helpers";

/**
 * Component to create a parent ProductNode in BlockView.
 * @param node
 * @returns a FlowElement, the large box in BlockView.
 */
const BuildProductParentNode = (node: Node, explorerOpen: boolean) => {
  if (!node) return null;

  const type = TextResources.Type_BlockParentProductNode;
  // TODO: fix magic numbers and remove state mutation outside store
  const position = { x: explorerOpen ? 390 : 90, y: 0 };
  node.positionBlockX = position.x;
  node.positionBlockY = position.y;

  return {
    key: CreateId(),
    id: node.id,
    type: type,
    data: node,
    position: position,
    isHidden: node.isHidden,
    isSelected: node.isSelected,
    draggable: false,
    selectable: false,
  } as FlowElement;
};

export default BuildProductParentNode;
