import { IsOffPage } from "../../../../helpers/Aspects";
import { Edge } from "@mimirorg/modelbuilder-types";

export const IsOffPageEdge = (edge: Edge) => {
  return IsOffPage(edge?.fromNode) || IsOffPage(edge?.toNode);
};
