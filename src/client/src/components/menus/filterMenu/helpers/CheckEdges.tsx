import { Edge, RelationType } from "../../../../models";
import { IsTransportTerminal } from "../../../flow/helpers/common";
import FindConnector from "./FindConnector";

const CheckEdges = (edges: Edge[], type: RelationType | string) => {
  const elementsToRemove = [];

  if (type !== null) {
    edges?.forEach((edge) => {
      if (edge.fromConnector.relationType === type) elementsToRemove.push(edge);
    });
    if (type === "Hide all") {
      edges?.forEach((edge) => {
        elementsToRemove.push(edge);
      });
    }
  } else {
    edges?.forEach((edge) => {
      if (
        IsTransportTerminal(edge.fromConnector) &&
        edge.fromConnector.relationType === undefined
      ) {
        elementsToRemove.push(edge);
      }
      const conn = FindConnector(edge.fromNodeId, edge.fromConnectorId);
      elementsToRemove.push(conn);
    });
  }

  return elementsToRemove;
};

export default CheckEdges;
