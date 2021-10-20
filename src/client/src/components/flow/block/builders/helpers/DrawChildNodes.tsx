import { Elements } from "react-flow-renderer";
import { BuildBlockNode } from "..";
import { Node, Edge } from "../../../../../models";
import { IsFamily, IsPartOfTerminal } from "../../../helpers";

/**
 * Component to draw all children nodes in BlockView.
 * @param edges
 * @param allNodes
 * @param selectedNode
 * @param elements
 */
const DrawChildNodes = (edges: Edge[], allNodes: Node[], selectedNode: Node, elements: Elements<any>) => {
  edges.forEach((edge) => {
    if (ValidateEdge(edge, selectedNode)) {
      const toNode = allNodes.find((n) => n.id === edge.toNode.id);
      if (toNode) elements.push(BuildBlockNode(toNode, null, allNodes));
    }
  });
};

function ValidateEdge(edge: Edge, selectedNode: Node) {
  return (
    edge.fromNode.id === selectedNode?.id && IsFamily(selectedNode, edge.toNode) && IsPartOfTerminal(edge.toConnector)
  );
}

export default DrawChildNodes;
