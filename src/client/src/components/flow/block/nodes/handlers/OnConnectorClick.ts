import { Connector, ConnectorVisibility } from "@mimirorg/modelbuilder-types";
import { Dispatch } from "redux";
import { changeActiveConnector } from "../../../../../redux/store/project/actions";
import { IsConnectorVisible } from "../../../helpers/Connectors";

export const OnConnectorClick = (conn: Connector, isInput: boolean, nodeId: string, dispatch: Dispatch) => {
  const visible = IsConnectorVisible(conn);
  const connectorVisibility = SetConnectorVisibility(conn, isInput);

  dispatch(changeActiveConnector(nodeId, conn.id, connectorVisibility));

  if (!visible) return;

  // TODO: what to do with edges for hidden connectors

  // const edge = edges.find((e) => e.fromConnector.id === conn.id || e.toConnector.id === conn.id);
  // if (edge) dispatch(deleteEdge(edge.id));
};

function SetConnectorVisibility(conn: Connector, isInput: boolean) {
  const visible = IsConnectorVisible(conn);

  if (visible) return ConnectorVisibility.None;
  if (isInput) return ConnectorVisibility.InputVisible;
  return ConnectorVisibility.OutputVisible;
}
