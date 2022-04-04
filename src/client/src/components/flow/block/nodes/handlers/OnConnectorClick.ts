import { Dispatch } from "redux";
import { IsConnectorVisible } from "../../../../../helpers";
import { Connector, ConnectorVisibility, Edge, Node } from "../../../../../models";
import { changeActiveConnector, removeEdge } from "../../../../../redux/store/project/actions";

export const OnConnectorClick = (conn: Connector, isInput: boolean, node: Node, dispatch: Dispatch, edges: Edge[]) => {
  const visible = IsConnectorVisible(conn);
  const connectorVisibility = SetConnectorVisibility(conn, isInput);

  dispatch(changeActiveConnector(node.id, conn.id, connectorVisibility));

  if (visible) {
    const edge = edges.find((e) => e.fromConnector.id === conn.id || e.toConnector.id === conn.id);
    if (edge) dispatch(removeEdge(edge.id));
  }
};

function SetConnectorVisibility(conn: Connector, isInput: boolean) {
  const visible = IsConnectorVisible(conn);

  if (visible) return ConnectorVisibility.None;
  if (isInput) return ConnectorVisibility.InputVisible;
  else return ConnectorVisibility.OutputVisible;
}
