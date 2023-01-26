/* eslint-disable @typescript-eslint/no-unused-vars */
import { Node as FlowNode } from "react-flow-renderer";
import { BuildFlowChildNode } from "..";
import { IsFamily } from "../../../../../helpers/Family";
import { Node, Edge } from "@mimirorg/modelbuilder-types";
import { IsPartOfRelation } from "../../../helpers/Connectors";
import { nodeService } from "../../../../../services";

/**
 * Component to draw all children FlowNodes in BlockView.
 * @param nodes
 * @param edges
 * @param selectedBlockNode
 * @param flowNodes
 */
const DrawFlowChildNodes = (nodes: Node[], edges: Edge[], selectedBlockNode: Node, flowNodes: FlowNode[]) => {
  const children = nodeService.getChildrenNodes(selectedBlockNode.id, nodes, edges);
  const transportHandlers = nodeService.getTransportHandlerNodes(children, edges);
  // console.log(transportHandlers);

  // console.log(children);

  children?.forEach((node) => {
    const childNode = BuildFlowChildNode(node, selectedBlockNode);
    flowNodes.push(childNode);
  });

  transportHandlers?.forEach((node) => {
    const childNode = BuildFlowChildNode(node, selectedBlockNode);
    flowNodes.push(childNode);
  });
  // edges.forEach((edge) => {
  //   if (!ValidateEdge(edge, selectedBlockNode)) return;

  //   const targetNode = nodes.find((n) => n.id === edge.toNodeId);
  //   if (!targetNode) return;

  //   const childNode = BuildFlowChildNode(targetNode, selectedBlockNode);
  //   if (!childNode) return;
  //   flowNodes.push(childNode);
  // });
};

function ValidateEdge(edge: Edge, selectedBlockNode: Node) {
  return (
    IsPartOfRelation(edge.toConnector) && IsFamily(selectedBlockNode, edge.toNode) && edge.fromNodeId === selectedBlockNode.id
  );
}

export default DrawFlowChildNodes;
