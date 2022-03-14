import { FlowElement } from "react-flow-renderer";
import { TextResources } from "../../../../assets/text/TextResources";
import { Node } from "../../../../models";
import { CreateId } from "../../helpers";

/**
 * Component to create a parent node in BlockView.
 * @param node
 * @returns a ParentNode - a large container that allows organizing of the child nodes.
 */
const BuildParentNode = (node: Node) => {
  if (!node) return null;

  const type = TextResources.BLOCK_PARENTNODE;
  const position = { x: 0, y: 0 };

  // TODO: remove state mutation outside store
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
