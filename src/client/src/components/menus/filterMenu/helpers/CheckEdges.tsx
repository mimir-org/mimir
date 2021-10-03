import { TextResources } from "../../../../assets/text";
import { Edge, Node, RelationType } from "../../../../models";
import { IsPartOfTerminal, IsTransportTerminal, IsLocationTerminal } from "../../../flow/helpers";

const CheckEdges = (edges: Edge[], type: RelationType | string, node: Node) => {
  const elementsToRemove = [];

  // All transport edges
  if (type === TextResources.Relations_Transport) {
    edges?.forEach((edge) => {
      if (IsTransportTerminal(edge.fromConnector) && edge.fromConnector.relationType === undefined)
        elementsToRemove.push(edge);
    });
  }

  // All partOf edges
  if (type === TextResources.Relations_PartOf_Relationship) {
    edges?.forEach((edge) => {
      if (IsPartOfTerminal(edge.fromConnector)) elementsToRemove.push(edge);
    });
  }

  // All hasLocation edges
  if (type === TextResources.Aspect_Location) {
    edges?.forEach((edge) => {
      if (IsLocationTerminal(edge.fromConnector)) elementsToRemove.push(edge);
    });
  }

  edges?.forEach((edge) => {
    if (type === RelationType.PartOf) {
      if (edge.fromNode.aspect === node?.aspect && IsPartOfTerminal(edge.fromConnector))
        elementsToRemove.push(edge); // Part of
    }

    if (type === RelationType.HasLocation) {
      if (edge.fromNode.aspect === node?.aspect && IsLocationTerminal(edge.fromConnector))
        elementsToRemove.push(edge); // Has Location
    }
    if (edge.fromConnector.name === type) elementsToRemove.push(edge); // Transport
  });
  return elementsToRemove;
};

export default CheckEdges;
