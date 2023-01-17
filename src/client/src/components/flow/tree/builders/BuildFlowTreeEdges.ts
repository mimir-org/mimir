import { Edge as FlowEdge } from "react-flow-renderer";
import { GetTreeEdgeType } from "../helpers";
import { ConvertEdgeToFlowEdge } from "../../converters";
import { EdgeType } from "../../../../models/project";
import { Edge, Node } from "@mimirorg/modelbuilder-types";
import { VisualFilterData } from "../../../../models/application/VisualFilter";

const BuildFlowTreeEdges = (mimirNodes: Node[], mimirEdges: Edge[], filter: VisualFilterData) => {
  const flowEdges: FlowEdge[] = [];

  mimirEdges.forEach((edge) => {
    const edgeType = GetTreeEdgeType(edge.fromConnector);
    const treeEdge = BuildTreeEdge(edge, edgeType, mimirNodes, filter);
    if (treeEdge) flowEdges.push(treeEdge);
  });

  return flowEdges;
};

function BuildTreeEdge(edge: Edge, edgeType: EdgeType, nodes: Node[], filter: VisualFilterData) {
  const sourceNode = nodes.find((node) => node.id === edge.fromNodeId);
  const targetNode = nodes.find((node) => node.id === edge.toNodeId);
  return ConvertEdgeToFlowEdge(edge, edgeType, sourceNode, targetNode, filter);
}

export default BuildFlowTreeEdges;
