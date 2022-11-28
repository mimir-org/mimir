import { Dispatch } from "redux";
import { changeActiveConnector, deleteEdge } from "../../../../../redux/store/project/actions";
import { IsConnectorVisible } from "../../../helpers/Connectors";
import { Connector, ConnectorVisibility, Edge, Node } from "@mimirorg/modelbuilder-types";
import { FindProxyConnector, CreateProxyTerminals, DeleteProxyTerminal } from "../../hooks/helpers/ProxyTerminals";

/**
 * Component to handle a click on a terminal in the drop-down menu for a Node in BlockView.
 * @param sourceConnector
 * @param isInput
 * @param sourceNode
 * @param dispatch
 * @param edges
 */
export const OnConnectorClick = (
  sourceConnector: Connector,
  isInput: boolean,
  sourceNode: Node,
  dispatch: Dispatch,
  edges?: Edge[]
) => {
  const visible = IsConnectorVisible(sourceConnector);
  const connectorVisibility = SetConnectorVisibility(sourceConnector, isInput);
  dispatch(changeActiveConnector(sourceNode.id, sourceConnector.id, connectorVisibility));

  const proxy = FindProxyConnector(sourceConnector.id, sourceNode);

  if (proxy == null && !visible) {
    if (isInput) {
      CreateProxyTerminals(null, sourceConnector, dispatch);
    } else {
      CreateProxyTerminals(sourceConnector, null, dispatch);
    }
  }
  if (proxy != null && visible) {
    DeleteProxyTerminal(proxy, dispatch);
  }

  if (!visible) return;

  if (edges != null) {
    const edgesToDelete = edges.filter(
      (e) =>
        e.fromConnector.id === sourceConnector.id ||
        e.toConnector.id === sourceConnector.id ||
        e.toConnector.id === proxy.id ||
        e.fromConnector.id === proxy.id
    );

    if (edgesToDelete && edgesToDelete.length > 0) {
      edgesToDelete.forEach((edge) => {
        dispatch(deleteEdge(edge.id));
      });
    }
  }
};

function SetConnectorVisibility(conn: Connector, isInput: boolean) {
  const visible = IsConnectorVisible(conn);

  if (visible) return ConnectorVisibility.None;
  if (isInput) return ConnectorVisibility.InputVisible;
  return ConnectorVisibility.OutputVisible;
}
