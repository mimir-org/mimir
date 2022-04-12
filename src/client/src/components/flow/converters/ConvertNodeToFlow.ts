import { Node as FlowNode } from "react-flow-renderer";
import { Aspect, Node } from "../../../models";

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
    hidden: false, // Opacity is controlled by the styled component
    selected: node.selected,
    draggable: true,
    selectable: true,
    connectable: true,
    parentNode: node.parentNodeId,
  } as FlowNode;
};

const GetNodeType = (node: Node) => {
  let typeName = node.isRoot ? "Aspect" : "";
  typeName += Aspect[node.aspect];
  return typeName;
};

export default ConvertNodeToFlow;
