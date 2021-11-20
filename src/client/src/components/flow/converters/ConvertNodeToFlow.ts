import { FlowElement } from "react-flow-renderer";
import { IsAspectNode } from "../../../helpers";
import { Node } from "../../../models";
import { GetNodeType, GetParent } from "../helpers";
import { SetTreeNodePosition } from "../tree/helpers";

/**
 * Component to convert a Mimir Node to a FlowElement that interacts with the Flow library.
 * @param node
 * @returns a FlowElement
 */
const ConvertNodeToFlow = (node: Node) => {
  if (!node) return null;
  const position = SetTreeNodePosition(node, GetParent(node));

  return {
    id: node.id,
    type: GetNodeType(node),
    data: node,
    position: position,
    isHidden: false, // Opacity is controlled by the styled component
    isSelected: node.isSelected,
    draggable: true,
    selectable: !IsAspectNode(node),
    connectable: true,
  } as FlowElement;
};

export default ConvertNodeToFlow;
