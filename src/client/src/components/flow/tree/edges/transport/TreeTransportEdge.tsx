import { Connector, ConnectorTerminal } from "lib";
import { EdgeProps, getSmoothStepPath } from "react-flow-renderer";
import { GetTreeEdgeStyle } from "../helpers/GetTreeEdgeStyle";

/**
 * Component for TransportEdges in TreeView.
 * @param params
 * @returns a horizontal transport edge between Product/Function nodes.
 */
export const TreeTransportEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
}: EdgeProps) => {
  const sourceTerminal = data.source.connectors?.find((x: Connector) => x.id === data.edge.fromConnector.id) as ConnectorTerminal;
  const color = sourceTerminal?.color;

  // Adjust to match connector
  targetX -= 6;

  const smoothStep = getSmoothStepPath({ sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition });
  // TODO: We need information of type of transport
  const isHidden = data?.edge.hidden;
  return <path id={id} style={GetTreeEdgeStyle(color, !isHidden)} className="path-treeTransportEdge" d={smoothStep} />;
};
