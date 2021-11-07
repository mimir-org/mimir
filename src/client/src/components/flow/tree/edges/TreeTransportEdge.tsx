import { ArrowHeadType, getMarkerEnd, getSmoothStepPath } from "react-flow-renderer";
import { Connector } from "../../../../models";
import { GetEdgeStyle } from "../../helpers";

/**
 * Component for TransportEdges in TreeView.
 * @param params
 * @returns a horizontal transport edge between Product/Function nodes.
 */
const TreeTransportEdge = ({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, data, markerEndId }) => {
  const markerEnd = getMarkerEnd(ArrowHeadType.ArrowClosed, markerEndId);
  const sourceConnector = data.source.connectors?.find((x) => x.id === data.edge.fromConnector.id) as Connector;
  const color = sourceConnector?.color;

  const smoothStep = getSmoothStepPath({
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
      style={GetEdgeStyle(color, !data?.edge.isHidden)}
      className="path-edgeTransport"
      d={smoothStep}
      markerEnd={markerEnd}
    />
  );
};
export default TreeTransportEdge;
