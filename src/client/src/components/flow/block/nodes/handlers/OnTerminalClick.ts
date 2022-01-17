import { Dispatch } from "redux";
import { IsConnectorVisible } from "../../../../../helpers";
import { Connector, Edge, Node } from "../../../../../models";
import { changeActiveConnector, removeEdge } from "../../../../../redux/store/project/actions";
import { SetConnectorVisibility } from "../helpers";

const OnTerminalClick = (conn: Connector, isInput: boolean, node: Node, dispatch: Dispatch, edges: Edge[]) => {
  const visible = IsConnectorVisible(conn);
  const connectorVisibility = SetConnectorVisibility(conn, isInput);

  dispatch(changeActiveConnector(node.id, conn.id, connectorVisibility, conn.inputOrder, conn.outputOrder));

  if (visible) {
    const edge = edges.find((e) => e.fromConnector.id === conn.id || e.toConnector.id === conn.id);
    if (edge) dispatch(removeEdge(edge.id));
  }
};

export default OnTerminalClick;
