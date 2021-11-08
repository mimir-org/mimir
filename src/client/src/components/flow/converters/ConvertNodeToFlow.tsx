import { FlowElement } from "react-flow-renderer";
import { Node } from "../../../models";
import { GetNodeType } from "../helpers";

/**
 * Component to convert a Mimir Node to a FlowElement that interacts with the Flow library.
 * @param node
 * @returns a FlowElement
 */
const ConvertNodeToFlow = (node: Node) => {
  if (!node) return null;
  const position = { x: node.positionX, y: node.positionY };

  return {
    id: node.id,
    type: GetNodeType(node),
    data: node,
    position: position,
    isHidden: false, // Opacity is controlled by the styled component
    isSelected: node.isSelected,
    draggable: true,
    selectable: true,
    connectable: true,
  } as FlowElement;
};

export default ConvertNodeToFlow;
