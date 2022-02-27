import { EdgeProps, getBezierPath, getMarkerEnd } from "react-flow-renderer";
import { Color } from "../../../../../compLibrary/colors";
import { IsProduct } from "../../../../../helpers";
import { GetTreeEdgeStyle } from "../helpers/GetTreeEdgeStyle";

/**
 * Component for RelationEdges in TreeView.
 * @param params
 * @returns a horizontal hasLocation/fulfilledBy edge.
 */
export const TreeRelationEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  arrowHeadType,
  markerEndId,
}: EdgeProps) => {
  const markerEnd = getMarkerEnd(arrowHeadType, markerEndId);
  const color = IsProduct(data.target) ? Color.ProductSelected : Color.LocationSelected;

  const bezierPath = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <path
      id={id}
      style={GetTreeEdgeStyle(color, !data?.edge.isHidden)}
      className={"path-relationEdge"}
      d={bezierPath}
      markerEnd={markerEnd}
    />
  );
};
