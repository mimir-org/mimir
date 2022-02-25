import { ArrowHeadType, EdgeProps, getBezierPath, getMarkerEnd } from "react-flow-renderer";
import { Color } from "../../../../../compLibrary/colors";
import { IsProduct } from "../../../../../helpers";
import { Node } from "../../../../../models";

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
      className="path-blockRelationEdge"
      d={bezierPath}
      markerEnd={markerEnd}
    />
  );
};

function GetEdgeRelationStyle(source: Node, visible: boolean) {
  const getColor = () => {
    if (IsProduct(source)) return Color.ProductSelected;
    return Color.LocationSelected;
  };

  return {
    stroke: getColor(),
    strokeDasharray: 2.5,
    strokeWidth: "2px",
    opacity: visible ? 1 : 0,
    transition: "opacity 250ms",
  };
}
