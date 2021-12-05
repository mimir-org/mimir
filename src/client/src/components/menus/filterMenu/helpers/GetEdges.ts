import { Edge, EDGE_KIND } from "../../../../models";
import { EDGE_TYPE } from "../../../../models/project";

const GetEdges = (elements: any[]) => {
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

export default GetEdges;