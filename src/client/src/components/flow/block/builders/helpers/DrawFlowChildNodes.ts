import { Node as FlowNode } from "react-flow-renderer";
import { BuildFlowChildNode } from "..";
import { IsFamily } from "../../../../../helpers/Family";
import { Node, Edge } from "@mimirorg/modelbuilder-types";
import { IsPartOfRelation } from "../../../helpers/Connectors";

/**
 * Component to draw all children FlowNodes in BlockView.
 * @param nodes
 * @param edges
 * @param selectedBlockNode
 * @param flowNodes
 */
const DrawFlowChildNodes = (nodes: Node[], edges: Edge[], selectedBlockNode: Node, flowNodes: FlowNode[]) => {
  edges.forEach((edge) => {
    if (!ValidateEdge(edge, selectedBlockNode)) return;

    const targetNode = nodes.find((n) => n.id === edge.toNodeId);
    if (!targetNode) return;

    const childNode = BuildFlowChildNode(targetNode, selectedBlockNode);
    if (!childNode) return;
    flowNodes.push(childNode);
  });
};

function ValidateEdge(edge: Edge, selectedBlockNode: Node) {
  return (
    IsPartOfRelation(edge.toConnector) && IsFamily(selectedBlockNode, edge.toNode) && edge.fromNodeId === selectedBlockNode.id
  );
}

export default DrawFlowChildNodes;
