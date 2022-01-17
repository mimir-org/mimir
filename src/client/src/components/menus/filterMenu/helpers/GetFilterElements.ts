import { Elements } from "react-flow-renderer";
import { IsOffPage } from "../../../../helpers";
import { Edge, Node } from "../../../../models";

const GetFilterElements = (elements: Elements): { nodes: Node[], edges: Edge[] } => {
  const nodes: Node[] = [];
  const edges: Edge[] = [];

  elements?.forEach((elem) => {
    const edge = elem.data?.edge as Edge;
    const node = elem.data as Node;

    if (edge && !IsOffPage(edge.fromNode)) {
      edges.push(edge);
    } else if (node && !IsOffPage(node)) {
      nodes.push(node);
    }
  });

  return { nodes, edges };
};

export default GetFilterElements;
