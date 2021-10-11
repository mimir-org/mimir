import "./BlockEdge.scss";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { GetClassName, GetStyle } from "./helpers";
import { Connector, RelationType } from "../../../models";
import { ArrowHeadType, getBezierPath, getMarkerEnd, getSmoothStepPath } from "react-flow-renderer";

const BlockEdgeType = ({ id, sourceX, sourceY, targetX, targetY, data, markerEndId }) => {
  const markerEnd = getMarkerEnd(ArrowHeadType.ArrowClosed, markerEndId);
  const fromConn = data.source.connectors?.find((conn: Connector) => conn.id === data.edge.fromConnectorId) as Connector;
  const hasLocation = fromConn?.relationType === RelationType.HasLocation;
  const electro = useSelector<RootState>((s) => s.electro.visible) as boolean;

  useEffect(() => {}, [electro]);

  const smooth = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  const bezier = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  return !hasLocation ? (
    <path id={id} style={GetStyle(fromConn)} className="react-flow__edge-path" d={smooth} markerEnd={markerEnd} />
  ) : (
    <>
      <path
        id={id}
        style={GetStyle(fromConn)}
        className={GetClassName(data.source) + ""}
        d={bezier}
        markerEnd={markerEnd}
      />
      <path
        id={id}
        style={GetStyle(fromConn)}
        className={GetClassName(data.source) + "--dashed"}
        d={bezier}
        markerEnd={markerEnd}
      />
    </>
  );
};

export default BlockEdgeType;
// const arrowStyle = document.body.style;
// arrowStyle.setProperty("--arrow-color", fromConnector?.color);
