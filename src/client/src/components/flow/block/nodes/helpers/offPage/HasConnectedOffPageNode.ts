import { IsOffPage } from "../../../../../../helpers";
import { Edge } from "../../../../../../models";

const HasConnectedOffPageNode = (edges: Edge[], edge: Edge, isTargetNode: boolean) => {
  let existingOffPageEdge: Edge;

  if (isTargetNode) {
    existingOffPageEdge = edges?.find((x) => x?.toConnectorId === edge.toConnectorId && IsOffPage(x?.fromNode));
  } else {
    existingOffPageEdge = edges?.find((x) => x?.fromConnectorId === edge.fromConnectorId && IsOffPage(x?.toNode));
  }

  return existingOffPageEdge !== undefined;
};

export default HasConnectedOffPageNode;
