import red from "../../../../../redux/store";
import { Dispatch } from "redux";
import { changeActiveConnector, deleteEdge } from "../../../../../redux/store/project/actions";
import { IsConnectorVisible, IsPartOfRelation } from "../../../helpers/Connectors";
import { Connector, ConnectorVisibility, Node } from "@mimirorg/modelbuilder-types";
import { CreateRequiredOffPageNode } from "../blockNode/helpers/CreateRequiredOffPageNode";
import { OffPageData } from "../../../../../models/project";
import { CreateId } from "../../../helpers";
import { DeleteRequiredOffPageNode } from "../blockNode/helpers/DeleteRequiredOffPageNode";
import { IsOffPage } from "../../../../../helpers/Aspects";

/**
 *
 * @param conn
 * @param isInput
 * @param isOffPage
 * @param node
 * @param dispatch
 * @returns
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
 *
 * @param sourceNode
 * @param sourceConnector
 * @param dispatch
 * @param visible
 * @returns
 */
function HandleOffPageCheckBoxClick(sourceNode: Node, sourceConnector: Connector, dispatch: Dispatch, visible: boolean) {
  if (!visible) {
    const offPageNodeId = CreateId();
    const data = {
      offPageNodeId,
      sourceConnector,
      sourceNode,
      isRequired: true,
      position: { x: 0, y: 0 },
    } as OffPageData;
    CreateRequiredOffPageNode(data, dispatch);
  } else {
    // Remove OffPage node
    // Fix target/source

    const offPageTransportEdge = red.store
      .getState()
      .projectState.project.edges.find((e) => e.fromConnectorId === sourceConnector.id && IsOffPage(e.toNode));

    const offPagePartOfEdge = red.store
      .getState()
      .projectState.project.edges.find((e) => e.toNodeId === offPageTransportEdge.toNodeId && IsPartOfRelation(e.fromConnector));

    const offPageNodeId = offPageTransportEdge.toNodeId;

    if (offPageNodeId != undefined) {
      dispatch(deleteEdge(offPageTransportEdge?.id));
      dispatch(deleteEdge(offPagePartOfEdge?.id));
      DeleteRequiredOffPageNode(offPageNodeId, sourceNode.id, sourceConnector.id, dispatch);
    }
  }
}
