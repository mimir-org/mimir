import { Edge, RelationType } from "../../../../models";
import { IsTransportTerminal } from "../../../flow/helpers/common";

const CheckEdges = (edges: Edge[], type: RelationType | string) => {
  const elementsToRemove = [];

  if (type === "Show all") {
    edges?.forEach((edge) => {
      elementsToRemove.push(edge);
    });
  }

  // All transport edges
  if (type === "Transport") {
    edges?.forEach((edge) => {
      if (
        IsTransportTerminal(edge.fromConnector) &&
        edge.fromConnector.relationType === undefined
      )
        elementsToRemove.push(edge);
    });
  }

  edges?.forEach((edge) => {
    if (edge.fromConnector.relationType === type) elementsToRemove.push(edge); // Part of
    if (edge.fromConnector.name === type) elementsToRemove.push(edge); // Transport
  });
  return elementsToRemove;
};

export default CheckEdges;
