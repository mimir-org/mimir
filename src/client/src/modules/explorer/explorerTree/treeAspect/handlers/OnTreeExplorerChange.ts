import { Dispatch } from "redux";
import { setNodeVisibility } from "../../../../../redux/store/project/actions";
import { ConnectorDirection, Edge, Node, Project, RelationType } from "@mimirorg/modelbuilder-types";
import { IsRelation } from "../../../../inspector/helpers/IsType";

/**
 * Handler for changing visibility of a node in the TreeView's Explorer.
 * @param project
 * @param node
 * @param dispatch
 */
export const OnTreeExplorerChange = (project: Project, node: Node, dispatch: Dispatch) => {
  const { nodes, edges } = findChildren(project, node);
  dispatch(setNodeVisibility(nodes, edges, !node.hidden));
};

const findChildren = (project: Project, current: Node): { nodes: string[]; edges: string[] } => {
  const childrenNodes = [] as string[];
  const childrenEdges = [] as string[];
  resolveChildren(project, current, childrenNodes);
  resolveEdges(project, childrenNodes, childrenEdges, !current.hidden);
  return { nodes: childrenNodes, edges: childrenEdges };
};

/**
 * Recursively find children nodes that is affected on visibility.
 * @param project The current project
 * @param current The current node
 * @param children The current node and the affected children
 */
const resolveChildren = (project: Project, current: Node, children: string[]): void => {
  children.push(current.id);

  // There should only be one output PartOf connector
  const partofConnector = current.connectors.find(
    (c) => IsRelation(c) && c.type === ConnectorDirection.Output && c.relationType === RelationType.PartOf
  );
  if (partofConnector == null) return;

  const connectedEdges = project.edges.filter((e) => e.fromConnectorId === partofConnector.id);
  if (connectedEdges == null || connectedEdges.length < 1) return;

  connectedEdges.forEach((edge) => {
    const node = project.nodes.find((n) => n.id == edge.toNodeId);
    if (node != null) {
      resolveChildren(project, node, children);
    }
  });
};

/**
 * Find affected edges on visibility.
 * @param project The current project
 * @param nodes The node and children nodes that should change visibility
 * @param edges The affected adges
 * @param hidden The new hidden state
 */
const resolveEdges = (project: Project, nodes: string[], edges: string[], hidden: boolean): void => {
  const affected = [] as Edge[];

  project.edges.forEach((e) => {
    const anyNodes = nodes.some((n) => n === e.fromNodeId || n === e.toNodeId);
    if (anyNodes) affected.push(e);
  });

  affected.forEach((e) => {
    if (hidden) {
      edges.push(e.id);
    }
    if (!hidden) {
      let otherNode = {} as Node;
      const isEdgeFrom = nodes.some((n) => n === e.fromNodeId);

      if (isEdgeFrom) {
        otherNode = project.nodes.find((n) => n.id == e.toNodeId);
      } else {
        otherNode = project.nodes.find((n) => n.id == e.fromNodeId);
      }

      if (nodes.some((x) => x === otherNode.id) || !otherNode.hidden) {
        edges.push(e.id);
      }
    }
  });
};
