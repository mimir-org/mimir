import { Node as FlowNode } from "react-flow-renderer";
import { TextResources } from "../../../../assets/text/TextResources";
import { Node } from "../../../../models";
import { CreateId } from "../../helpers";

/**
 * Component to create a parent node in BlockView.
 * This component creates a FlowElement that contains the basic data for a node.
 * On top of the FlowNode a layer with Mimir functionality is created. See the BlockParentNode component.
 * @param node
 * @returns a ParentNode - a large container that allows organizing of the child nodes.
 */
const BuildFlowParentNode = (node: Node) => {
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
    hidden: node.blockHidden,
    selected: node.selected,
    draggable: false,
    selectable: false,
  } as FlowNode;
};

export default BuildFlowParentNode;
