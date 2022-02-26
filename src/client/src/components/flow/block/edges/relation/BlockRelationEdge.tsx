import { EdgeProps, getBezierPath } from "react-flow-renderer";
import { Color } from "../../../../../compLibrary/colors";
import { IsProduct } from "../../../../../helpers";
import { Node } from "../../../../../models";
import { useAppSelector, electroSelector } from "../../../../../redux/store";

/**
 * Component for a RelationEdge.
 * @param params
 * @returns a partOf- or fullfilledBy edge in BlockView.
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
  const visible = !data?.edge?.isHidden;
  const isElectro = useAppSelector(electroSelector);

  // Adjust to make room for marker arrow
  const margin = 6;
  targetX -= !isElectro ? margin : 0;

  const bezierPath = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <marker
        id="arrow"
        viewBox="0 0 10 20"
        refX="5"
        refY="5"
        markerUnits="userSpaceOnUse"
        markerWidth="10"
        markerHeight="20"
        orient={!isElectro ? "auto-start-reverse" : "auto"}
      >
        <path d="M 0 0 L 10 5 L 0 10 z" fill={Color.Black} />
      </marker>
      <path
        id={id}
        style={GetEdgeRelationStyle(data.target, visible)}
        className="path-blockRelationEdge"
        d={bezierPath}
        markerEnd="url(#arrow)"
      />
    </>
  );
};

function GetEdgeRelationStyle(source: Node, visible: boolean) {
  const getColor = () => {
    if (IsProduct(source)) return Color.ProductSelected;
    return Color.LocationSelected;
  };

  return {
    stroke: getColor(),
    opacity: visible ? 1 : 0,
    transition: "opacity 250ms",
  };
}
