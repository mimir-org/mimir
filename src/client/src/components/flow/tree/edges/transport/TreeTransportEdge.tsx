import { Connector } from "@mimirorg/modelbuilder-types";
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
  const sourceConnector = data.source.connectors?.find((x: Connector) => x.id === data.edge.fromConnector.id) as Connector;
  const color = "#000"; //  sourceConnector?.color; // TODO: fix color

  // Adjust to match connector
  targetX -= 6;

  const smoothStep = getSmoothStepPath({ sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition });

  return <path id={id} style={GetTreeEdgeStyle(color, !data?.edge.hidden)} className="path-treeTransportEdge" d={smoothStep} />;
};
