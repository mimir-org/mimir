import { Project, Node, Edge } from "../../../models";

export const InitializeProject = (project: Project): Project => {
  project.nodes = project.nodes.map((node) => new Node(node));
  project.edges = project.edges.map((edge) => new Edge(edge));

  return project;
};
