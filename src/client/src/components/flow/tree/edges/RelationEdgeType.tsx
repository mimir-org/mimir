import { getBezierPath, getMarkerEnd } from "react-flow-renderer";
import { GetRelationEdgeStyle } from "../../helpers";

/**
 * Component for RelationEdges in TreeView.
 * @param params
 * @returns an horizontal hasLocation/fulfilledBy edge.
 */
export default function RelationEdgeType({
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
}) {
  const markerEnd = getMarkerEnd(arrowHeadType, markerEndId);

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
      style={GetRelationEdgeStyle(data.target, !data?.edge.isHidden)}
      className={"path-edgeRelation"}
      d={bezierPath}
      markerEnd={markerEnd}
    />
  );
}
