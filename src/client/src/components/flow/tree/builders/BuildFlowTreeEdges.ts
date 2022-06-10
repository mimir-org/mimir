import { Edge as FlowEdge } from "react-flow-renderer";
import { IsOffPage } from "../../../../helpers/Aspects";
import { GetTreeEdgeType } from "../helpers";
import { ConvertEdgeToFlow } from "../../converters";
import { EdgeType } from "../../../../models/project";
import { Edge, Node } from "@mimirorg/modelbuilder-types";

const BuildFlowTreeEdges = (mimirNodes: Node[], mimirEdges: Edge[], animated: boolean) => {
  const flowEdges: FlowEdge[] = [];

  mimirEdges.forEach((edge) => {
    const edgeType = GetTreeEdgeType(edge.fromConnector);
    if (IsOffPage(edge.toNode)) return;

    const treeEdge = BuildTreeEdge(edge, edgeType, mimirNodes, animated);
    if (treeEdge) flowEdges.push(treeEdge);
  });

  return flowEdges;
};

function BuildTreeEdge(edge: Edge, edgeType: EdgeType, nodes: Node[], animated: boolean) {
  const sourceNode = nodes.find((node) => node.id === edge.fromNodeId);
  const targetNode = nodes.find((node) => node.id === edge.toNodeId);

  if (edge.fromNode && edge.toNode) return ConvertEdgeToFlow(edge, edgeType, sourceNode, targetNode, animated);
}

export default BuildFlowTreeEdges;
