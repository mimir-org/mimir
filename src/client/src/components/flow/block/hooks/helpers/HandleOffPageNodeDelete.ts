import { Dispatch } from "redux";
import { IsOffPage } from "../../../../../helpers";
import { Node, Edge, Project } from "../../../../../models";
import { removeEdge, removeNode, setOffPageStatus } from "../../../../../redux/store/project/actions";
import { GetParent } from "../../../helpers";
import {
  GetOppositeTransportEdge,
  GetConnectedEdge,
  GetParentConnector,
  GetPartOfEdge,
  GetTransportEdge,
} from "./OffPageDeleteFunctions";

/**
 * Component to handle deleting an OffPageNode. There are two kinds of OffPage nodes -> Required and Connected.
 * A Connected OffPage node is pointing to another node that is not visible on the screen, this is handled by
 * the HandleConnectedOffPageDelete component.
 * @param nodeToDelete
 * @param project
 * @param dispatch
 */
export const HandleOffPageNodeDelete = (nodeToDelete: Node, project: Project, dispatch: Dispatch) => {
  const parentNodeId = GetParent(nodeToDelete)?.id;
  if (!parentNodeId) return;

  const transportEdge = GetTransportEdge(nodeToDelete?.id, parentNodeId, project);
  const partOfEdge = GetPartOfEdge(nodeToDelete, parentNodeId, project);
  const parentConnectorId = GetParentConnector(transportEdge, nodeToDelete?.id)?.id;
  const connectedEdge = GetConnectedEdge(parentConnectorId, project);

  if (transportEdge && !connectedEdge) dispatch(setOffPageStatus(parentNodeId, parentConnectorId, false));
  if (connectedEdge) HandleConnectedOffPageDelete(project, transportEdge, connectedEdge, dispatch);
  if (partOfEdge) dispatch(removeEdge(partOfEdge.id));
};

/**
 * Component to handle deleting a Connected OffPageNode. All related OffPage nodes and edges are removed.
 * A Connected OffPageNode is a node that appears if a node is connected to a node that is not displayed on the screen.
 * When deleting a Connected OffPageNode, the actual edge that the OffPageNode refers to is removed.
 * The opposite Connected OffPageNode and edges are also removed.
 * @param project
 * @param transportEdge
 * @param referenceEdge
 * @param dispatch
 */
export const HandleConnectedOffPageDelete = (project: Project, transportEdge: Edge, referenceEdge: Edge, dispatch: Dispatch) => {
  dispatch(removeEdge(referenceEdge.id));
  dispatch(removeEdge(transportEdge.id));

  const oppositeTransportEdge = GetOppositeTransportEdge(project, referenceEdge);

  const oppositeOffPageNode = IsOffPage(oppositeTransportEdge.toNode)
    ? oppositeTransportEdge.toNode
    : oppositeTransportEdge.fromNode;

  const oppositeParent = GetParent(oppositeOffPageNode);
  const oppositePartOfEdge = GetPartOfEdge(oppositeOffPageNode, oppositeParent?.id, project);

  if (oppositeOffPageNode) dispatch(removeNode(oppositeOffPageNode.id));
  if (oppositeTransportEdge) dispatch(removeEdge(oppositeTransportEdge.id));
  if (oppositePartOfEdge) dispatch(removeEdge(oppositePartOfEdge.id));
};
