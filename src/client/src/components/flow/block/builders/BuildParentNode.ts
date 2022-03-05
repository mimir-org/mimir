import { FlowElement } from "react-flow-renderer";
import { TextResources } from "../../../../assets/text/TextResources";
import { Node } from "../../../../models";
import { CreateId } from "../../helpers";

/**
 * Component to create a parent node in BlockView.
 * @param node
 * @param explorerOpen
 * @returns a FlowElement, the large box in BlockView.
 */
const BuildParentNode = (node: Node, explorerOpen: boolean) => {
  if (!node) return null;

  const type = TextResources.Type_BlockParentNode;
  // TODO: fix magic numbers and remove state mutation outside store
  const position = { x: explorerOpen ? 450 : 90, y: 0 };
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

export default BuildParentNode;
