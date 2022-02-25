import { EdgeProps, getBezierPath, getMarkerEnd } from "react-flow-renderer";
import { Color } from "../../../../compLibrary/colors";
import { IsProduct } from "../../../../helpers";
import { Node } from "../../../../models";

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

const GetEdgeRelationStyle = (source: Node, visible: boolean) => {
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
};

export default TreeRelationEdge;
