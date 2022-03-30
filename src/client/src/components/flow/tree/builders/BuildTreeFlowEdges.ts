import { Edge as FlowEdge } from "react-flow-renderer";
import { Project } from "../../../../models";
import { IsOffPage } from "../../../../helpers";
import { BuildTreeEdge } from ".";
import { GetTreeEdgeType } from "../helpers";

const BuildTreeFlowEdges = (project: Project, animated: boolean) => {
  const flowEdges: FlowEdge[] = [];

  if (!project) return flowEdges;

  project.edges?.forEach((edge) => {
    const edgeType = GetTreeEdgeType(edge.fromConnector);
    let treeEdge = null;
    if (!IsOffPage(edge.toNode)) treeEdge = BuildTreeEdge(edge, edgeType, project.nodes, animated);
    if (treeEdge) flowEdges.push(treeEdge);
  });

  return flowEdges;
};

export default BuildTreeFlowEdges;
