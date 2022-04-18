import { Node as FlowNode } from "react-flow-renderer";
import { TextResources } from "../../../../assets/text/TextResources";
import { Size } from "../../../../compLibrary/size/Size";
import { Node } from "../../../../models";
import { CreateId } from "../../helpers";

/**
 * Component to create a secondary parent node in BlockView.
 * This component creates a FlowElement that contains the basic data for a node.
 * On top of the FlowNode a layer with Mimir functionality is created. See the BlockParentNode component.
 * @param primaryNode
 * @param secondaryNode
 * @returns the second ParentNode in SpliView.
 */
const BuildFlowSecondaryParentNode = (primaryNode: Node, secondaryNode: Node) => {
  if (!primaryNode || !secondaryNode) return null;

  const type = TextResources.BLOCK_PARENTNODE;
  const distanceToPrimaryNode = Size.SPLITVIEW_DISTANCE;

  // The secondaryNode is positioned to the right of the primaryNode
  const position = {
    x: primaryNode.positionBlockX + primaryNode.width + distanceToPrimaryNode,
    y: primaryNode.positionBlockY,
  };

  // TODO: Remove state mutation outside store
  secondaryNode.positionBlockX = position.x;
  secondaryNode.positionBlockY = position.y;

  return {
    key: CreateId(),
    id: secondaryNode.id,
    type: type,
    data: secondaryNode,
    position: position,
    hidden: secondaryNode.blockHidden,
    selected: secondaryNode.selected,
    draggable: false,
    selectable: false,
  } as FlowNode;
};

export default BuildFlowSecondaryParentNode;
