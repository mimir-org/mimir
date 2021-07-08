import { Edge, Node, RelationType } from "../../../../models";
import {
  IsPartOfTerminal,
  IsTransportTerminal,
} from "../../../flow/helpers/common";

const CheckEdges = (edges: Edge[], type: RelationType | string, node: Node) => {
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

  // All partOf edges
  if (type === "Part of Relationship") {
    edges?.forEach((edge) => {
      if (IsPartOfTerminal(edge.fromConnector)) elementsToRemove.push(edge);
    });
  }

  edges?.forEach((edge) => {
    if (type === RelationType.PartOf) {
      if (
        edge.fromNode.aspect === node?.aspect &&
        IsPartOfTerminal(edge.fromConnector)
      )
        elementsToRemove.push(edge);
    }
    if (edge.fromConnector.name === type) elementsToRemove.push(edge); // Transport
  });
  return elementsToRemove;
};

export default CheckEdges;
