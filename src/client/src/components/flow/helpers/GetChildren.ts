import { IsPartOf } from ".";
import { Project, Node } from "../../../models";

export const GetChildren = (node: Node, project: Project) =>
  project.nodes.filter((otherNode) =>
    project.edges.find((edge) => edge.fromNodeId === node?.id && edge.toNodeId === otherNode?.id && IsPartOf(edge.fromConnector))
  );
