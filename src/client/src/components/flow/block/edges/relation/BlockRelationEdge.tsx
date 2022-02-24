import { ArrowHeadType, EdgeProps, getBezierPath, getMarkerEnd } from "react-flow-renderer";
import { GetEdgeRelationStyle } from "./helpers/GetEdgeRelationStyle";

/**
 * Component for a RelationEdge.
 * @param params
 * @returns a RelationEdge in BlockView.
 */
export const BlockRelationEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
}: EdgeProps) => {
  const markerEnd = getMarkerEnd(ArrowHeadType.ArrowClosed, null);
  const visible = !data?.edge?.isHidden;

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
      style={GetEdgeRelationStyle(data.target, visible)}
      className="path-blockEdge"
      d={bezierPath}
      markerEnd={markerEnd}
    />
  );
};
