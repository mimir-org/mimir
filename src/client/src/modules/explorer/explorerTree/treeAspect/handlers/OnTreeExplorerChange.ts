import { Dispatch } from "redux";
// import { setNodeVisibility } from "../../../../../redux/store/project/actions";
import { AspectObject, Connection, Direction, Project } from "lib";
import { ConnectorPartOf } from "../../../../../lib/classes/Connector";

/**
 * Handler for changing visibility of a node in the TreeView's Explorer.
 * @param project
 * @param node
 * @param dispatch
 */
export const OnTreeExplorerChange = (project: Project, node: AspectObject, dispatch: Dispatch) => {
  const { nodes, edges } = findChildren(project, node);
  // dispatch(setNodeVisibility(nodes, edges, !node.hidden));
};

const findChildren = (project: Project, current: AspectObject): { nodes: string[]; edges: string[] } => {
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
const resolveChildren = (project: Project, current: AspectObject, children: string[]): void => {
  children.push(current.id);

  // There should only be one output PartOf connector
  const partofConnector = current.connectors.find((c) => c instanceof ConnectorPartOf && c.direction === Direction.Output);
  if (partofConnector == null) return;

  const connectedEdges = project.connections.filter((e) => e.fromConnector === partofConnector.id);
  if (connectedEdges == null || connectedEdges.length < 1) return;

  connectedEdges.forEach((edge) => {
    const [, to] = project.getConnectionNodes(edge);
    if (to != null) {
      resolveChildren(project, to, children);
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
  const affected = [] as Connection[];

  project.connections.forEach((e) => {
    const [from, to] = project.getConnectionNodes(e);
    const anyNodes = nodes.some((n) => n === from.id || n === to?.id);
    if (anyNodes) affected.push(e);
  });

  affected.forEach((e) => {
    if (hidden) {
      edges.push(e.id);
    }
    if (!hidden) {
      const [from, to] = project.getConnectionNodes(e);
      let otherNode = {} as AspectObject;
      const isEdgeFrom = nodes.some((n) => n === from?.id);

      if (isEdgeFrom) {
        otherNode = project.aspectObjects.find((n) => n.id == to?.id);
      } else {
        otherNode = project.aspectObjects.find((n) => n.id == from?.id);
      }

      if (nodes.some((x) => x === otherNode.id) || !otherNode.hidden) {
        edges.push(e.id);
      }
    }
  });
};
