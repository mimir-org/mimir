import { IsOffPage } from "../../../../../../helpers";
import { Connector, Edge } from "../../../../../../models";
import { IsInputTerminal } from "../../../../helpers";

const HasRequiredOffPageNode = (edges: Edge[], connector: Connector) => {
  let existingEdge: Edge;

  if (IsInputTerminal(connector)) {
    existingEdge = edges?.find((edge) => edge?.toConnector?.id === connector.id && IsOffPage(edge?.fromNode));
  } else {
    existingEdge = edges?.find((edge) => edge?.fromConnector?.id === connector.id && IsOffPage(edge?.toNode));
  }

  return existingEdge !== undefined;
};

export default HasRequiredOffPageNode;
