import { Edge, RelationType } from "../../../../models";
import { IsTransportTerminal } from "../../../flow/helpers/common";

const CheckEdges = (edges: Edge[], type: RelationType | string) => {
  const elementsToRemove = [];

  // Sorted on RelationType
  if (type !== null) {
    edges?.forEach((edge) => {
      if (edge.fromConnector.relationType === type) elementsToRemove.push(edge);
    });

    // All connections
    if (type === "Hide all") {
      edges?.forEach((edge) => {
        elementsToRemove.push(edge);
      });
    }
  }
  // Transport connections
  if (type === "Transport") {
    edges?.forEach((edge) => {
      if (
        IsTransportTerminal(edge.fromConnector) &&
        edge.fromConnector.relationType === undefined
      ) {
        elementsToRemove.push(edge);
      }
    });
  }

  return elementsToRemove;
};

export default CheckEdges;
