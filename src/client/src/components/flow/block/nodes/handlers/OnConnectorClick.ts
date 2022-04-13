import { Dispatch } from "redux";
import { Connector, ConnectorVisibility, Edge } from "../../../../../models";
import { changeActiveConnector, deleteEdge } from "../../../../../redux/store/project/actions";
import { IsConnectorVisible } from "../../../helpers/Connectors";

export const OnConnectorClick = (conn: Connector, isInput: boolean, nodeId: string, dispatch: Dispatch, edges: Edge[]) => {
  const visible = IsConnectorVisible(conn);
  const connectorVisibility = SetConnectorVisibility(conn, isInput);

  dispatch(changeActiveConnector(nodeId, conn.id, connectorVisibility));

  if (!visible) return;

  const edge = edges.find((e) => e.fromConnector.id === conn.id || e.toConnector.id === conn.id);
  if (edge) dispatch(deleteEdge(edge.id));
};

function SetConnectorVisibility(conn: Connector, isInput: boolean) {
  const visible = IsConnectorVisible(conn);

  if (visible) return ConnectorVisibility.None;
  if (isInput) return ConnectorVisibility.InputVisible;
  return ConnectorVisibility.OutputVisible;
}
