import { Edge, RelationType } from "../../../../models";
import { IsTransportTerminal } from "../../../flow/helpers/common";
import FindConnector from "./FindConnector";

const CheckEdges = (edges: Edge[], type: RelationType | string) => {
  const elementsToRemove = [];

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
  } else {
    // Transport connections
    edges?.forEach((edge) => {
      if (
        IsTransportTerminal(edge.fromConnector) &&
        edge.fromConnector.relationType === undefined
      ) {
        elementsToRemove.push(edge);
      }
      const fromConnector = FindConnector(
        edge.fromNodeId,
        edge.fromConnectorId
      );
      const toConnector = FindConnector(edge.toNodeId, edge.toConnectorId);
      if (fromConnector) elementsToRemove.push(fromConnector);
      if (toConnector) elementsToRemove.push(toConnector);
    });
  }

  return elementsToRemove;
};

export default CheckEdges;
