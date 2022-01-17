import { Dispatch } from "redux";
import { IsConnectorVisible } from "../../../../../helpers";
import { Connector, ConnectorVisibility, Edge, Node } from "../../../../../models";
import { changeActiveConnector, removeEdge } from "../../../../../redux/store/project/actions";
import { IsBidirectionalTerminal } from "../../../helpers";

const OnTerminalClick = (conn: Connector, isInput: boolean, node: Node, dispatch: Dispatch, edges: Edge[]) => {
  const visible = IsConnectorVisible(conn);
  let connectorVisibility = visible ? ConnectorVisibility.None : conn.connectorVisibility;

  if (IsBidirectionalTerminal(conn)) {
    if (visible) connectorVisibility = ConnectorVisibility.None;
    else connectorVisibility = isInput ? ConnectorVisibility.InputVisible : ConnectorVisibility.OutputVisible;
  }

  dispatch(changeActiveConnector(node.id, conn.id, connectorVisibility, conn.inputOrder, conn.outputOrder));

  if (IsConnectorVisible(conn)) {
    const edge = edges.find((e) => e.fromConnector.id === conn.id || e.toConnector.id === conn.id);
    if (edge) dispatch(removeEdge(edge.id));
  }
};

export default OnTerminalClick;
