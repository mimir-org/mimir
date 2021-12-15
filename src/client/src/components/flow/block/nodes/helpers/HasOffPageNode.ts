import { IsOffPage } from "../../../../../helpers";
import { Connector, Edge } from "../../../../../models";

const CheckIfOffPageExists = (edges: Edge[], connector: Connector) => {
  const existingEdge = edges?.find(
    (edge) =>
      (edge?.fromConnector?.id === connector.id && IsOffPage(edge?.toNode)) ||
      (edge?.toConnector?.id === connector.id && IsOffPage(edge?.fromNode))
  );

  return existingEdge !== null;
};

export default CheckIfOffPageExists;
