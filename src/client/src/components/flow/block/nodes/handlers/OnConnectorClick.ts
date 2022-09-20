import red from "../../../../../redux/store";
import { Dispatch } from "redux";
import { changeActiveConnector } from "../../../../../redux/store/project/actions";
import { IsConnectorVisible } from "../../../helpers/Connectors";
import { Connector, ConnectorVisibility, Node } from "@mimirorg/modelbuilder-types";
import { CreateRequiredOffPageNode } from "../blockNode/helpers/CreateRequiredOffPageNode";
import { OffPageData } from "../../../../../models/project";
import { CreateId } from "../../../helpers";
import { DeleteRequiredOffPageNode } from "../blockNode/helpers/DeleteRequiredOffPageNode";

/**
 *
 * @param conn
 * @param isInput
 * @param isOffPage
 * @param node
 * @param dispatch
 * @returns
 */
export const OnConnectorClick = (conn: Connector, isInput: boolean, isOffPage: boolean, node: Node, dispatch: Dispatch) => {
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
  const offPageNodeId = CreateId();

  if (!visible) {
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
    const offPageNodeToRemove = red.store.getState().projectState.project.nodes.find((n) => n.id === offPageNodeId);
    DeleteRequiredOffPageNode(offPageNodeToRemove.id, sourceNode.id, sourceConnector.id, dispatch);
  }
}
