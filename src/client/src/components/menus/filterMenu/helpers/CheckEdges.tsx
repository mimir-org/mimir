import { Connector, Edge, RelationType } from "../../../../models";
import { IsTransportTerminal } from "../../../flow/helpers/common";

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
    });
  }

  return elementsToRemove;
};

export default CheckEdges;
