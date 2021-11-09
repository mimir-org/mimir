import { FlowElement } from "react-flow-renderer";
import { TextResources } from "../../../../assets/text";
import { Node } from "../../../../models";
import { CreateId } from "../../helpers";
import { SetConnectorOrder } from "./helpers";

/**
 * Component to create a parent Product Node in BlockView.
 * @param node
 * @returns a FlowElement, the large box in BlockView.
 */
const BuildParentProductNode = (node: Node) => {
  if (!node) return null;

  SetConnectorOrder(node);

  const type = TextResources.Type_BlockParentProductNode;
  const position = { x: -125, y: -40 };

  return {
    key: CreateId(),
    id: node.id,
    type: type,
    data: node,
    position: position,
    isHidden: false,
    isSelected: node.isSelected,
    draggable: false,
    selectable: false,
  } as FlowElement;
};

export default BuildParentProductNode;
