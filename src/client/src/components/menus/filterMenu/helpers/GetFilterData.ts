import { Node, Edge, EDGE_KIND } from "../../../../models";
import { EDGE_TYPE } from "../../../../models/project";

export const GetFilterNodes = (elements: any[]) => {
  const nodes: Node[] = [];
  const edgeTypes = Object.values(EDGE_TYPE);

  elements?.forEach((elem) => {
    const isEdge = edgeTypes.some((x) => x === elem.type?.toString() || elem.kind === EDGE_KIND);

    if (!isEdge) {
      const node = elem.data as Node;
      nodes.push(node);
    }
  });

  return nodes;
};

export const GetFilterEdges = (elements: any[]) => {
  const edges: Edge[] = [];
  const edgeTypes = Object.values(EDGE_TYPE);

  elements?.forEach((elem) => {
    const isEdge = edgeTypes.some((x) => x === elem.type?.toString() || elem.kind === EDGE_KIND);

    if (isEdge) {
      const edge = elem.data.edge as Edge;
      edges.push(edge);
    }
  });

  return edges;
};
