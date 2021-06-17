import { Node, Edge, RelationType } from "../../../../models";

const CheckEdges = (
  nodes: Node[],
  edges: Edge[],
  type: RelationType
): Edge[] => {
  const connectors = [];
  const edgesToRemove: Edge[] = [];
  if (nodes === null || nodes === undefined) return edgesToRemove;

  for (let i = 0; i < nodes.length; i++) {
    for (let j = 0; j < nodes[i].connectors.length; j++) {
      if (nodes[i].connectors[j].relationType === type) {
        connectors.push(nodes[i].connectors[j]);
      }
    }
  }

  for (let i = 0; i < edges.length; i++) {
    if (
      connectors.find((x) => x.id === edges[i].fromConnector) ||
      connectors.find((x) => x.id === edges[i].toConnector)
    ) {
      edgesToRemove.push(edges[i]);
    }
  }
  return edgesToRemove;
};

export default CheckEdges;
