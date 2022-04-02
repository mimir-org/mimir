import { Dispatch } from "redux";
import { IsOffPage } from "../../../../../helpers";
import { Edge, Project } from "../../../../../models";
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
 * A Required OffPageNode is deleted along with its transport edge and partOf edge.
 * A Connected OffPageNode is handled by HandleConnectedOffPageNode
 * @param nodeToDeleteId
 * @param project
 * @param dispatch
 */
export const HandleOffPageNodeDelete = (nodeToDeleteId: string, project: Project, dispatch: Dispatch) => {
  const parentNodeId = GetParent(nodeToDeleteId)?.id;
  if (!parentNodeId) return;

  const transportEdge = GetTransportEdge(nodeToDeleteId, parentNodeId, project);
  const partOfEdge = GetPartOfEdge(nodeToDeleteId, parentNodeId, project);
  const parentConnectorId = GetParentConnector(transportEdge, nodeToDeleteId)?.id;
  const connectedEdge = GetConnectedEdge(parentConnectorId, project);

  if (transportEdge && !connectedEdge) dispatch(setOffPageStatus(parentNodeId, parentConnectorId, false));
  if (connectedEdge) HandleConnectedOffPageDelete(project, transportEdge, connectedEdge, dispatch);
  if (partOfEdge) dispatch(removeEdge(partOfEdge.id));
};

/**
 * Handler for deleting a Connected OffPageNode. All related OffPage nodes and edges are deleted.
 * A Connected OffPageNode appears if a node is connected to a node not displayed on the screen.
 * When deleting a Connected OffPageNode, the actual transport edge that the OffPageNode refers to is deleted.
 * The opposite Connected OffPageNode and edges are also removed.
 * @param project
 * @param transportEdge
 * @param referenceEdge
 * @param dispatch
 */
export const HandleConnectedOffPageDelete = (project: Project, transportEdge: Edge, referenceEdge: Edge, dispatch: Dispatch) => {
  const oppositeTransportEdge = GetOppositeTransportEdge(project, referenceEdge);

  const oppositeOffPageNode = IsOffPage(oppositeTransportEdge.toNode)
    ? oppositeTransportEdge.toNode
    : oppositeTransportEdge.fromNode;

  const oppositeParent = GetParent(oppositeOffPageNode?.id);
  const oppositePartOfEdge = GetPartOfEdge(oppositeOffPageNode?.id, oppositeParent?.id, project);

  dispatch(removeEdge(referenceEdge.id));
  dispatch(removeEdge(transportEdge.id));

  if (oppositeOffPageNode) dispatch(removeNode(oppositeOffPageNode.id));
  if (oppositeTransportEdge) dispatch(removeEdge(oppositeTransportEdge.id));
  if (oppositePartOfEdge) dispatch(removeEdge(oppositePartOfEdge.id));
};
