import { Node, Edge } from "../../../../models/project";

const CheckEdges = (nodes: Node[], edges: Edge[], type: string): Edge => {
  // Find connector
  const connectors = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = 0; j < nodes[i].connectors.length; j++) {
      if (nodes[i].connectors[j].relationType === type) {
        connectors.push(nodes[i].connectors[j]);
      }
    }
  }
  // Find edge
  for (let i = 0; i < edges.length; i++) {
    for (let j = 0; j < connectors.length; j++) {
      if (
        edges[i].fromConnector === connectors[j].id ||
        edges[i].toConnector === connectors[j].id
      ) {
        return edges[i];
      }
    }
  }
};

export default CheckEdges;
