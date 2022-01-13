import { IsOffPage } from "../../../../helpers";
import { EDGE_KIND, Edge, Node } from "../../../../models";
import { EDGE_TYPE } from "../../../../models/project";

const GetFilterElements = (elements: any[]) => {
  const nodes: Node[] = [];
  const edges: Edge[] = [];

  const edgeTypes = Object.values(EDGE_TYPE);

  elements?.forEach((elem) => {
    const isEdge = edgeTypes.some((x) => x === elem.type?.toString() || elem.kind === EDGE_KIND);

    if (isEdge) {
      const edge = elem.data.edge as Edge;
      if (edge && !IsOffPage(edge.fromNode)) edges.push(edge);
    } else {
      const node = elem.data as Node;
      if (node && !IsOffPage(node)) nodes.push(node);
    }
  });

  return [nodes, edges];
};

export default GetFilterElements;
