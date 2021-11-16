import { getSmoothStepPath } from "react-flow-renderer";
import { Color } from "../../../../compLibrary/colors";

/**
 * Component for a PartOfEdge in BlockView used only by Product Nodes.
 * @param params
 * @returns a PartOfEdge between Product Nodes.
 */
const BlockPartEdge = ({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, data }) => {
  const visible = !data?.edge.isHidden;

  const smoothPath = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });

  return <path id={id} style={GetPartEdgeStyle(visible)} className="path-blockPartEdge" d={smoothPath} />;
};

function GetPartEdgeStyle(visible: boolean) {
  return {
    stroke: Color.ProductHeader,
    strokeWidth: "2px",
    opacity: visible ? 0.7 : 0,
    transition: "opacity 250ms",
  };
}
export default BlockPartEdge;
