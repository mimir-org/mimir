import red from "../redux/store";
import { IsPartOfTerminal } from "../components/flow/helpers/Connectors";
import { LibItem, Node, Project } from "../models";

export const IsFamily = (element: Node | LibItem, elementToCheck: Node | LibItem) => {
  return element?.aspect === elementToCheck?.aspect;
};

export const IsDirectChild = (child: Node, parent: Node) => {
  return GetParent(child)?.id === parent?.id;
};

export const IsParentOf = (parentNode: Node, childNode: Node) => {
  const edges = red.store.getState().projectState.project.edges;
  const edge = edges?.find((e) => e.toNode?.id === childNode?.id && e.fromNode?.id === parentNode?.id);

  return edge && IsPartOfTerminal(edge.fromConnector);
};

export const GetParent = (childNode: Node) => {
  const edges = red.store.getState().projectState.project?.edges;
  const nodes = red.store.getState().projectState.project?.nodes;

  const parentEdge = edges?.find((e) => e.toNodeId === childNode?.id && IsPartOfTerminal(e.toConnector));
  const parentNode = nodes?.find((n) => n.id === parentEdge?.fromNodeId);

  return parentNode ?? null;
};

export const GetChildren = (node: Node, project: Project) =>
  project?.nodes?.filter((otherNode) =>
    project?.edges?.find(
      (edge) => edge.fromNodeId === node?.id && edge.toNodeId === otherNode?.id && IsPartOfTerminal(edge.fromConnector)
    )
  );
