import red from "../../../../../redux/store";
import { Dispatch } from "redux";
import { changeActiveConnector, deleteEdge } from "../../../../../redux/store/project/actions";
import { IsConnectorVisible } from "../../../helpers/Connectors";
import { Connector, ConnectorVisibility, Node } from "@mimirorg/modelbuilder-types";
import { CreateRequiredOffPageNode } from "../blockNode/helpers/CreateRequiredOffPageNode";
import { OffPageData } from "../../../../../models/project";
import { CreateId } from "../../../helpers";
import { DeleteRequiredOffPageNode } from "../blockNode/helpers/DeleteRequiredOffPageNode";
import { IsOffPage } from "../../../../../helpers/Aspects";
import { GetOffPagePartOfEdge } from "../../../handlers/helpers/OffPageDeleteFunctions";

/**
 * Component to handle a click on a terminal in the drop-down menu for a Node in BlockView.
 * @param conn
 * @param isInput
 * @param isOffPage
 * @param node
 * @param dispatch
 */
export const OnConnectorClick = (conn: Connector, isInput: boolean, node: Node, dispatch: Dispatch, isOffPage?: boolean) => {
  const visible = IsConnectorVisible(conn);
  const connectorVisibility = SetConnectorVisibility(conn, isInput);

  dispatch(changeActiveConnector(node.id, conn.id, connectorVisibility));

  if (isOffPage) HandleOffPageCheckBoxClick(node, conn, dispatch, visible);
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

/**
 * Component to handle a click on the OffPageNode option in the drop-down menu for terminals in BlockView.
 * This component either creates an OffPageNode or removes one.
 * @param sourceNode
 * @param sourceConnector
 * @param dispatch
 * @param visible
 */
function HandleOffPageCheckBoxClick(sourceNode: Node, sourceConnector: Connector, dispatch: Dispatch, visible: boolean) {
  if (!visible) {
    const offPageNodeId = CreateId();
    const data = {
      offPageNodeId,
      sourceConnector,
      sourceNode,
      isRequired: true,
      position: { x: 0, y: 150 },
    } as OffPageData;
    CreateRequiredOffPageNode(data, dispatch);
  } else {
    // Remove OffPage node and edges
    const edges = red.store.getState().projectState.project.edges;
    const offPageTransportEdge = edges.find(
      (e) =>
        (e.fromConnectorId === sourceConnector.id && IsOffPage(e.toNode)) ||
        (e.toConnectorId === sourceConnector.id && IsOffPage(e.fromNode))
    );
    const offPageNodeId = offPageTransportEdge.toNodeId ?? offPageTransportEdge.fromNodeId;

    if (offPageNodeId != undefined) {
      const offPagePartOfEdge = GetOffPagePartOfEdge(offPageNodeId, sourceNode.id, edges);
      dispatch(deleteEdge(offPagePartOfEdge?.id));
      dispatch(deleteEdge(offPageTransportEdge?.id));
      DeleteRequiredOffPageNode(offPageNodeId, sourceNode.id, sourceConnector.id, dispatch);
    }
  }
}
