import { Elements } from "react-flow-renderer";
import { BuildTreeEdge } from ".";
import { GetTreeEdgeType } from "../helpers";
import { Project } from "../../../../models";
import { IsOffPage } from "../../../../helpers";
import { ConvertNodeToFlow } from "../../converters";

const BuildTreeElements = (project: Project, animated: boolean) => {
  const elements: Elements = [];

  if (!project) return elements;

  project.nodes?.forEach((node) => {
    let treeNode = null;
    if (!IsOffPage(node)) treeNode = ConvertNodeToFlow(node);
    if (treeNode) elements.push(treeNode);
  });

  project.edges?.forEach((edge) => {
    const edgeType = GetTreeEdgeType(edge.fromConnector);
    let treeEdge = null;
    if (!IsOffPage(edge.toNode)) treeEdge = BuildTreeEdge(edge, edgeType, project.nodes, animated);
    if (treeEdge) elements.push(treeEdge);
  });

  return elements;
};

export default BuildTreeElements;
