import { Elements } from "react-flow-renderer";
import { CreateBlockEdge } from "..";
import { Node, Edge } from "../../../../models";
import { EdgeType, EDGE_TYPE } from "../../../../models/project";
import red from "../../../../redux/store";

/**
 * Component to draw all edges in BlockView.
 * @param edges
 * @param nodes
 * @param elements
 */
const DrawEdges = (edges: Edge[], nodes: Node[], elements: Elements<any>) => {
  const edgez = red.store.getState().projectState.project.edges as Edge[];
  edgez.forEach((edge) => {
    const blockEdge = CreateBlockEdge(nodes, edge, EDGE_TYPE.BLOCK as EdgeType);
    if (blockEdge) elements.push(blockEdge);
  });
};

export default DrawEdges;
