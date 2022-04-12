import { Dispatch } from "redux";
import { IsOffPage } from "../../../../../helpers/Aspects";
import { Edge, Project } from "../../../../../models";
import { removeEdge, removeNode, setOffPageStatus } from "../../../../../redux/store/project/actions";
import { GetParentConnector, GetRelatedPartOfEdge, GetRelatedTransportEdge } from "./OffPageDeleteFunctions";

/**
 * When deleting an edge it needs to be checked if that edge has generated some connected OffPage elements.
 * If so, all related edges and nodes are deleted.
 * @param edgeToDelete
 * @param project
 * @param dispatch
 */
export const HandleOffPageEdgeDelete = (edgeToDelete: Edge, project: Project, dispatch: Dispatch) => {
  if (!edgeToDelete) return;

  project.nodes.forEach((node) => {
    if (!IsOffPage(node)) return;

    const relatedTransportEdge = GetRelatedTransportEdge(node.id, edgeToDelete, project);
    if (!relatedTransportEdge) return;

    const partOfEdge = GetRelatedPartOfEdge(node, project);
    const parentNodeId = node.parentNodeId;
    const parentNodeConn = GetParentConnector(relatedTransportEdge, node.id);

    dispatch(setOffPageStatus(parentNodeId, parentNodeConn?.id, false));
    dispatch(removeEdge(relatedTransportEdge.id));
    dispatch(removeEdge(partOfEdge?.id));
    dispatch(removeNode(node.id));
  });
};
