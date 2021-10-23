import { FlowElement } from "react-flow-renderer";
import { TextResources } from "../../../../assets/text";
import { Node } from "../../../../models";
import { CreateId } from "../../helpers";

/**
 * Component to create a parent node in BlockView.
 * @param node
 * @returns a FlowElement, the big box in BlockView.
 */
const BuildParentBlockNode = (node: Node) => {
  if (!node) return null;
  const rezising = false;

  const type = TextResources.Type_BlockParentNode;
  const position = { x: node.positionBlockX, y: node.positionBlockY };
  let draggable = false;
  if (!rezising) draggable = true;

  return {
    key: CreateId(),
    id: node.id,
    type: type,
    data: node,
    position: position,
    isHidden: false,
    isSelected: true,
    draggable: draggable,
    selectable: true,
  } as FlowElement;
};

export default BuildParentBlockNode;
