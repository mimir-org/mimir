import { EdgeProps, getSmoothStepPath } from "react-flow-renderer";
import { GetAspectColor } from "assets";
import { AspectColorType } from "../../../../../models";
import { GetBlockEdgeStyle } from "../helpers/GetBlockEdgeStyle";

/**
 * Component for a partOf edge in BlockView.
 * @param params
 * @returns an edge between two nodes in BlockView.
 */
export const BlockPartOfEdge = ({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, data }: EdgeProps) => {
  const visible = !data?.edge?.hidden;
  const color = GetAspectColor(data.edge.fromNode, AspectColorType.Main);
  const borderRadius = 20;

  // Adjust to make room for marker arrow
  const margin = 6;
  sourceX += 0;
  targetX -= margin;

  const style = GetBlockEdgeStyle(color, visible);
  const smoothPath = getSmoothStepPath({ sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, borderRadius });

  return <path id={id} style={style} className="path-blockPartOfEdge" d={smoothPath} />;
};

// TODO: fix this on next Edge update
// function GetElectroPath(sourceX: number, sourceY: number, targetX: number, targetY: number) {
//   const margin = 20;
//   const marginSmall = 15;

//   const start = `M${sourceX} ${sourceY + 5}`;
//   const pathSource = `S${sourceX} ${sourceY - margin * 3} ${sourceX} ${sourceY + marginSmall}`;
//   const pathTarget = `${targetX} ${targetY - margin * 4}  ${targetX} ${targetY - margin} ${targetX} ${targetY - margin * 2}`;
//   const stop = `${targetX} ${targetY - 5}`;

//   return `${start} ${pathSource} ${pathTarget} ${stop}`;
// }
