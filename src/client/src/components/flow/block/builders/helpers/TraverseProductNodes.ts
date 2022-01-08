import { Node, Project } from "../../../../../models";
import { IsPartOf } from "../../../helpers";

/**
 * Function to find children of a given Product Node in BlockView, and add them to a productChildren list.
 * @param project
 * @param selectedNode
 * @param productChildren
 */
function TraverseProductNodes(project: Project, selectedNode: Node, productChildren: Node[]) {
  const children: Node[] = [];
  const nodes = project.nodes;
  const edges = project.edges;

  edges.forEach((edge) => {
    if (edge.fromNodeId === selectedNode.id && IsPartOf(edge.fromConnector)) {
      const node = nodes.find((x) => x.id === edge.toNodeId);
      children.push(node);
      productChildren.push(node);
    }
  });

  if (children.length === 0) return;

  children.forEach((node) => {
    TraverseProductNodes(project, node, productChildren);
  });
}

export default TraverseProductNodes;
