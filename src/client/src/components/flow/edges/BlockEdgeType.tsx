import "./BlockEdge.scss";
import { GetClassName, GetStyle } from "./helpers";
import { Connector } from "../../../models";
import { ArrowHeadType, getBezierPath, getMarkerEnd, getSmoothStepPath } from "react-flow-renderer";
import { IsLocationTerminal } from "../helpers";

const BlockEdgeType = ({ id, sourceX, sourceY, targetX, targetY, data, markerEndId }) => {
  const markerEnd = getMarkerEnd(ArrowHeadType.ArrowClosed, markerEndId);
  const fromConn = data.source.connectors?.find((conn: Connector) => conn.id === data.edge.fromConnectorId) as Connector;
  const hasLocation = IsLocationTerminal(fromConn);

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
