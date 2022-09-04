import { Node, Aspect } from "@mimirorg/modelbuilder-types";
import { Node as FlowNode } from "react-flow-renderer";

/**
 * Component to convert a Mimir Node to a FlowNode that interacts with the Flow library.
 * @param node
 * @returns a FlowNode.
 */
const ConvertNodeToFlowNode = (node: Node) => {
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
  } as FlowNode;
};

function GetNodeType(node: Node) {
  let typeName = node.isRoot ? "Aspect" : "";
  typeName += Aspect[node.aspect];
  return typeName;
}

export default ConvertNodeToFlowNode;
