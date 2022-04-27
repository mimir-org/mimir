import { Dispatch } from "redux";
import { IsOffPage } from "../../../../helpers/Aspects";
import { Edge, Node } from "../../../../models";
import { deleteEdge, deleteNode, setOffPageStatus } from "../../../../redux/store/project/actions";
import { GetParentConnector, GetRelatedPartOfEdge, GetRelatedTransportEdge } from "./OffPageDeleteFunctions";

/**
 * When deleting an edge it needs to be checked if that edge has generated some connected OffPage elements.
 * If so, all related edges and nodes are deleted.
 * @param edgeToDelete
 * @param nodes
 * @param edges
 * @param dispatch
 */
export const HandleOffPageEdgeDelete = (edgeToDelete: Edge, nodes: Node[], edges: Edge[], dispatch: Dispatch) => {
  if (!edgeToDelete) return;

  nodes.forEach((node) => {
    if (!IsOffPage(node)) return;

    const relatedTransportEdge = GetRelatedTransportEdge(node.id, edgeToDelete, edges);
    if (!relatedTransportEdge) return;

    const partOfEdge = GetRelatedPartOfEdge(node, edges);
    const parentNodeId = node.parentNodeId;
    const parentNodeConn = GetParentConnector(relatedTransportEdge, node.id);

    dispatch(setOffPageStatus(parentNodeId, parentNodeConn?.id, false));
    dispatch(deleteEdge(relatedTransportEdge.id));
    dispatch(deleteEdge(partOfEdge?.id));
    dispatch(deleteNode(node.id));
  });
};
