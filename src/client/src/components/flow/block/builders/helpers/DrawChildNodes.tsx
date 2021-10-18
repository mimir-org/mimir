import { Elements } from "react-flow-renderer";
import { BuildBlockNode } from "..";
import { Node, Edge } from "../../../../../models";
import { IsPartOfTerminal } from "../../../helpers";

/**
 * Component to draw all children nodes in BlockView.
 * @param edges
 * @param allNodes
 * @param selectedNode
 * @param elements
 */
const DrawChildNodes = (edges: Edge[], allNodes: Node[], selectedNode: Node, elements: Elements<any>) => {
  edges.forEach((edge) => {
    if (
      edge.fromNode.id === selectedNode?.id &&
      selectedNode?.aspect === edge.toNode.aspect &&
      IsPartOfTerminal(edge.toConnector)
    ) {
      const toNode = allNodes.find((n) => n.id === edge.toNode.id);
      if (toNode) elements.push(BuildBlockNode(toNode, null, allNodes));
    }
  });
};

export default DrawChildNodes;
