import { FlowElement } from "react-flow-renderer";
import { TextResources } from "../../../../assets/text";
import { Node } from "../../../../models";
import { CreateId } from "../../helpers";

/**
 * Component to create a parent node in BlockView.
 * @param node
 * @returns a ParentNode - a large container that allows organizing of the child nodes.
 */
const BuildParentNode = (node: Node) => {
  if (!node) return null;

  const type = TextResources.Type_BlockParentNode;
  const position = { x: 0, y: 0 };
  node.positionBlockX = position.x;
  node.positionBlockY = position.y;
  // TODO: remove state mutation outside store

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
