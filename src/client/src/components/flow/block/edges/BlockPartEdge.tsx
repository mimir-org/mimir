import { getSmoothStepPath } from "react-flow-renderer";
import { Color } from "../../../../compLibrary";

/**
 * Component for a PartOfEdge in BlockView used only by Product Nodes.
 * @param params
 * @returns a vertical PartOfEdge between Product Nodes.
 */
const BlockPartEdge = ({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, data }) => {
  const visible = !data?.edge.isHidden;

  const GetEdgeStyle = () => {
    return {
      stroke: Color.ProductMain,
      strokeWidth: "2px",
      opacity: visible ? 1 : 0,
      transition: "opacity 250ms",
    };
  };

  const smoothPath = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });

  return <path id={id} style={GetEdgeStyle()} className="path-blockPartEdge" d={smoothPath} />;
};

export default BlockPartEdge;
