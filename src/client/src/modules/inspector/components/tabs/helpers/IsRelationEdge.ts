import { Edge } from "@mimirorg/modelbuilder-types";
import { IsRelation } from "../../../../../services";

export const IsRelationEdge = (edge: Edge) => {
  return IsRelation(edge.fromConnector);
};
