import { Edge, RelationType } from "../../../../models";

const CheckEdges = (edges: Edge[], type: RelationType | string) => {
  const elementsToRemove = [];

  edges?.forEach((edge) => {
    if (edge.fromConnector.relationType === type) {
      elementsToRemove.push(edge);
    }
    if (edge.fromConnector.name === type) {
      elementsToRemove.push(edge);
    }
  });
  return elementsToRemove;
};

export default CheckEdges;
