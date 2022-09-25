import red from "../../../../../redux/store";
import { Dispatch } from "redux";
import { changeActiveConnector, deleteEdge } from "../../../../../redux/store/project/actions";
import { IsConnectorVisible } from "../../../helpers/Connectors";
import { Connector, ConnectorVisibility, Node } from "@mimirorg/modelbuilder-types";
import { CreateRequiredOffPageNode } from "../blockNode/helpers/CreateRequiredOffPageNode";
import { OffPageData } from "../../../../../models/project";
import { CreateId } from "../../../helpers";
import { DeleteRequiredOffPageNode } from "../blockNode/helpers/DeleteRequiredOffPageNode";
import {
  GetOffPagePartOfEdge,
  GetOffPageSourceTransportEdge,
  GetOffPageTargetTransportEdge,
} from "../../../handlers/helpers/OffPageDeleteFunctions";

/**
 * Component to handle a click on a terminal in the drop-down menu for a Node in BlockView.
 * @param sourceConnector
 * @param isInput
 * @param sourceNode
 * @param dispatch
 * @param isElectroView
 * @param isOffPage
 */
export const OnConnectorClick = (
  sourceConnector: Connector,
  isInput: boolean,
  sourceNode: Node,
  dispatch: Dispatch,
  isElectroView: boolean,
  isOffPage?: boolean
) => {
  const visible = IsConnectorVisible(sourceConnector);
  const connectorVisibility = SetConnectorVisibility(sourceConnector, isInput);
  dispatch(changeActiveConnector(sourceNode.id, sourceConnector.id, connectorVisibility));

  if (isOffPage) {
    visible
      ? RemoveOffPageNodeFromDropdownMenu(sourceConnector.id, sourceNode, dispatch)
      : AddOffPageNodeFromDropdownMenu(sourceConnector, sourceNode, isElectroView, dispatch);
  }

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
 * Function to add a new OffPageNode by a click in the drop-down menu for a Node.
 * @param sourceConnector
 * @param sourceNode
 * @param isElectroView
 * @param dispatch
 */
function AddOffPageNodeFromDropdownMenu(
  sourceConnector: Connector,
  sourceNode: Node,
  isElectroView: boolean,
  dispatch: Dispatch
) {
  console.log({ sourceConnector });
  const offPageNodeId = CreateId();
  const position = { x: 0, y: 0 }; //  SetInitialOffPageNodePosition(sourceNode, isElectroView);
  const isRequired = true;
  const data = { offPageNodeId, sourceConnector, sourceNode, isRequired, position } as OffPageData;

  CreateRequiredOffPageNode(data, dispatch);
}

/**
 * Function to remove an OffPageNode and related edges by a click in the drop-down menu for a Node.
 * @param sourceConnectorId
 * @param sourceNode
 * @param dispatch
 */
function RemoveOffPageNodeFromDropdownMenu(sourceConnectorId: string, sourceNode: Node, dispatch: Dispatch) {
  const edges = red.store.getState().projectState.project.edges;

  const sourceTransportEdge = GetOffPageSourceTransportEdge(sourceConnectorId, edges);
  const targetTransportEdge = GetOffPageTargetTransportEdge(sourceConnectorId, edges);

  if (sourceTransportEdge == undefined && targetTransportEdge == undefined) return;

  const offPageNodeId = sourceTransportEdge != undefined ? sourceTransportEdge.fromNodeId : targetTransportEdge.toNodeId;
  const offPageTransportEdge = sourceTransportEdge != undefined ? sourceTransportEdge : targetTransportEdge;

  if (offPageNodeId == undefined) return;

  const offPagePartOfEdge = GetOffPagePartOfEdge(offPageNodeId, sourceNode.id, edges);
  if (offPagePartOfEdge == undefined || offPagePartOfEdge == null) return;

  dispatch(deleteEdge(offPagePartOfEdge.id));
  dispatch(deleteEdge(offPageTransportEdge.id));
  DeleteRequiredOffPageNode(offPageNodeId, sourceNode.id, sourceConnectorId, dispatch);
}

// function SetInitialOffPageNodePosition(sourceNode: Node, isElectroView: boolean) {
//   const adjustment = 1.8;
//   const marginX = Size.NODE_WIDTH / adjustment;
//   const marginY = Size.NODE_HEIGHT / adjustment;

//   const parentNode = GetParentNode(sourceNode.id);

//   if (isElectroView) {
//     const x = sourceNode.positionBlockX + marginX;
//     const y = parentNode?.height;
//     return { x, y } as Position;
//   }

//   const x = 0;
//   const y = sourceNode.positionBlockY + marginY;
//   return { x, y } as Position;
// }
