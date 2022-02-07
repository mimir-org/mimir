import { EdgeProps, getBezierPath, getMarkerEnd } from "react-flow-renderer";
import { GetEdgeRelationStyle } from "../../helpers";

/**
 * Component for RelationEdges in TreeView.
 * @param params
 * @returns a horizontal hasLocation/fulfilledBy edge.
 */
const TreeRelationEdge = ({
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
      style={GetEdgeRelationStyle(data.target, !data?.edge.isHidden)}
      className={"path-relationEdge"}
      d={bezierPath}
      markerEnd={markerEnd}
    />
  );
};

export default TreeRelationEdge;
