import { Elements } from "react-flow-renderer";
import { BuildBlockEdge } from "..";
import { Node, Project } from "../../../../../models";
import { EdgeType, EDGE_TYPE } from "../../../../../models/project";
import { IsPartOf } from "../../../helpers";

/**
 * Component to draw all edges in BlockView.
 * @param project
 * @param elements
 * @param secondaryNode
 * @param animatedEdge
 */
const DrawBlockEdges = (project: Project, elements: Elements<any>, secondaryNode: Node, animatedEdge: boolean) => {
  const nodes = project.nodes;
  const edges = project.edges;

  edges?.forEach((edge) => {
    if (!IsPartOf(edge.fromConnector)) {
      const blockEdge = BuildBlockEdge(nodes, edge, EDGE_TYPE.BLOCK as EdgeType, secondaryNode, animatedEdge, elements);
      if (blockEdge) elements.push(blockEdge);
    }
  });
};

export default DrawBlockEdges;
