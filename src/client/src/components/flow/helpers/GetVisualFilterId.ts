import { Node, Aspect } from "@mimirorg/modelbuilder-types";
import { EDGE_TYPE } from "../../../lib/types/enums/EdgeType";
import { VisualFilterId } from "../../../lib/models/VisualFilter";

export type FilterType = "Category" | "Item";

export const GetVisualFilterId = (source: Node, target: Node, edgeType: EDGE_TYPE): Record<FilterType, string | null> => {
  const record: Record<FilterType, string> = {
    Category: null,
    Item: null,
  };

  switch (edgeType) {
    case EDGE_TYPE.TREE_PARTOF:
    case EDGE_TYPE.BLOCK_PARTOF:
      record.Category = VisualFilterId.PARTOF;
      record.Item =
        source.aspect === Aspect.Function
          ? VisualFilterId.FUNCTION
          : source.aspect === Aspect.Product
          ? VisualFilterId.PRODUCT
          : VisualFilterId.LOCATION;
      break;
    case EDGE_TYPE.TREE_RELATION:
    case EDGE_TYPE.BLOCK_RELATION:
      record.Category = VisualFilterId.RELATION;
      record.Item =
        target.aspect === Aspect.Location
          ? VisualFilterId.HAS_LOCATION
          : target.aspect === Aspect.Product
          ? VisualFilterId.FULFILLED_BY
          : null;
      break;
    case EDGE_TYPE.TREE_TRANSPORT:
    case EDGE_TYPE.BLOCK_TRANSPORT:
      record.Category = VisualFilterId.TRANSPORT;
      record.Item = null;
      break;
    default:
      record.Category = VisualFilterId.INTERFACE;
      record.Item = null;
  }

  return record;
};
