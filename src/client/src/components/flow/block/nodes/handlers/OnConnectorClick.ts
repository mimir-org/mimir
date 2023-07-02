import { Dispatch } from "redux";
import { AspectObject, Connection, Connector } from "lib";

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
  sourceNode: AspectObject,
  dispatch: Dispatch,
  edges?: Connection[]
) => {
  console.log("OnConnectorClick");
  if (sourceConnector == null && sourceConnector.id == null) return;

  // const connectorVisibility = SetConnectorVisibility(sourceConnector, isInput);
  // dispatch(changeActiveConnector(sourceNode.id, sourceConnector.id, connectorVisibility));

  // const proxy = FindProxyConnector(sourceConnector.id, sourceNode);

  // if (proxy == null && !visible) {
  //   if (isInput) {
  //     CreateProxyTerminals(null, sourceConnector, dispatch);
  //   } else {
  //     CreateProxyTerminals(sourceConnector, null, dispatch);
  //   }
  // }
  // if (proxy != null && visible) {
  //   DeleteProxyTerminal(proxy, dispatch);
  //   dispatch(removeSelectedEdge());
  //   dispatch(removeSelectedNode());
  // }

  // if (!visible) return;

  // const edgesToDelete = edges?.filter(
  //   (e) =>
  //     (e.fromConnector.id && e.fromConnector.id === sourceConnector.id) ||
  //     (e.toConnector.id && e.toConnector.id === sourceConnector.id) ||
  //     (e.toConnector.id && e.toConnector.id === proxy?.id) ||
  //     (e.fromConnector.id && e.fromConnector.id === proxy?.id)
  // );

  // if (edgesToDelete && edgesToDelete.length > 0) {
  //   edgesToDelete.forEach((edge) => {
  //     // dispatch(deleteEdge(edge.id));
  //   });
  // }
};

// function SetConnectorVisibility(conn: Connector, isInput: boolean) {
//   const visible = IsConnectorVisible(conn);

//   if (visible) return ConnectorVisibility.None;
//   if (isInput) return ConnectorVisibility.InputVisible;
//   return ConnectorVisibility.OutputVisible;
// }
