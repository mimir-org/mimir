import { Edge as FlowEdge } from "react-flow-renderer";
import { Edge, Node, Project } from "../../../../models";
import { IsOffPage } from "../../../../helpers/Aspects";
import { GetTreeEdgeType } from "../helpers";
import { ConvertEdgeToFlow } from "../../converters";
import { EdgeType } from "../../../../models/project";

const BuildFlowTreeEdges = (project: Project, animated: boolean) => {
  if (!project) return [];
  const flowEdges: FlowEdge[] = [];

  project.edges.forEach((edge) => {
    const edgeType = GetTreeEdgeType(edge.fromConnector);
    let treeEdge = null;
    if (!IsOffPage(edge.toNode)) treeEdge = BuildTreeEdge(edge, edgeType, project.nodes, animated);
    if (treeEdge) flowEdges.push(treeEdge);
  });

  return flowEdges;
};

function BuildTreeEdge(edge: Edge, edgeType: EdgeType, nodes: Node[], animated: boolean) {
  const sourceNode = nodes?.find((node) => node.id === edge.fromNodeId);
  const targetNode = nodes?.find((node) => node.id === edge.toNodeId);

  if (edge.fromNode && edge.toNode) return ConvertEdgeToFlow(edge, edgeType, sourceNode, targetNode, animated);
}

export default BuildFlowTreeEdges;
