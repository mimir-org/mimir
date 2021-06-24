import { Edge, RelationType } from "../../../../models";
import { IsTransportTerminal } from "../../../flow/helpers/common";

const CheckEdges = (edges: Edge[], type: RelationType) => {
  const edgesToRemove: Edge[] = [];

  if (type !== null) {
    edges?.forEach((edge) => {
      if (edge.fromConnector.relationType === type) edgesToRemove.push(edge);
    });
  } else {
    edges?.forEach((edge) => {
      if (
        IsTransportTerminal(edge.fromConnector) &&
        edge.fromConnector.relationType === undefined
      )
        edgesToRemove.push(edge);
    });
  }

  return edgesToRemove;
};

export default CheckEdges;
