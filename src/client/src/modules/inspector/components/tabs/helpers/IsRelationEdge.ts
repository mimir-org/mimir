import { Edge } from "@mimirorg/modelbuilder-types";
import { IsRelationConnector } from "../../../../../components/flow/helpers/Connectors";

export const IsRelationEdge = (edge: Edge) => {
  return IsRelationConnector(edge.fromConnector);
};
