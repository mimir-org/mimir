import { TextResources } from "../../../../assets/text";
import { Edge, RelationType } from "../../../../models";
import { IsTransportTerminal } from "../../../flow/helpers/common";
import { GetConnector } from "./";

const CheckBlockEdges = (edges: Edge[], type: RelationType | string) => {
  const elementsToRemove = [];

  // Transport connections
  if (type === TextResources.Relations_Transport) {
    edges?.forEach((edge) => {
      if (
        IsTransportTerminal(edge.fromConnector) &&
        edge.fromConnector.relationType === undefined
      ) {
        elementsToRemove.push(edge);
      }
      // Find connectors
      const fromConnector = GetConnector(edge.fromNodeId, edge.fromConnectorId);
      const toConnector = GetConnector(edge.toNodeId, edge.toConnectorId);
      if (fromConnector) elementsToRemove.push(fromConnector);
      if (toConnector) elementsToRemove.push(toConnector);
    });
  }

  // Sort by type
  else {
    edges?.forEach((edge) => {
      if (edge.fromConnector.relationType === type) {
        elementsToRemove.push(edge);

        // Find connectors
        const fromConnector = GetConnector(edge.fromNodeId, edge.fromConnectorId);
        const toConnector = GetConnector(edge.toNodeId, edge.toConnectorId);
        if (fromConnector) elementsToRemove.push(fromConnector);
        if (toConnector) elementsToRemove.push(toConnector);
      }
    });
  }

  return elementsToRemove;
};

export default CheckBlockEdges;
