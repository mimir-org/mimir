import { Edge, RelationType } from "../../../../models";

const CheckEdges = (edges: Edge[], type: RelationType) => {
  const edgesToRemove: Edge[] = [];

  edges?.forEach((edge) => {
    if (edge.fromConnector.relationType === type) edgesToRemove.push(edge);
  });
  return edgesToRemove;
};

export default CheckEdges;
