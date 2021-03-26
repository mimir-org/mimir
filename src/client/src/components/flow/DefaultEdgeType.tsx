import React from "react";
import { getBezierPath, getMarkerEnd, getSmoothStepPath, EdgeText } from "react-flow-renderer";
import { getCenter } from './utils';

export default function DefaultEdgeType({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  data,
  arrowHeadType,
  markerEndId,
}) {



  const edgePath = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });
  
  const edgePath2 = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  



  const markerEnd = getMarkerEnd(arrowHeadType, markerEndId);
  

  const [centerX, centerY] = getCenter({ sourceX, sourceY, targetX, targetY });
  
  const text = data.text ? (
    <EdgeText
      x={centerX}
      y={centerY}
      label={data.text}
    //   labelStyle={labelStyle}
    //   labelShowBg={labelShowBg}
    //   labelBgStyle={labelBgStyle}
    //   labelBgPadding={labelBgPadding}
    //   labelBgBorderRadius={labelBgBorderRadius}
    />
  ) : null;

  return (
    <>
      <path
        id={id}
        style={style}
        className="react-flow__edge-path"
        d={edgePath2}
        markerEnd={markerEnd}
      />
     
        
          {text}
        
     
    </>
  );
}
