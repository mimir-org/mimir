import { Dispatch } from "redux";
import { Node, Edge } from "@mimirorg/modelbuilder-types";
import { deleteEdge, deleteNode, setOffPageStatus } from "../../../../redux/store/project/actions";
import { GetParentConnectorId, GetPartOfEdge } from "./OffPageDeleteFunctions";

/**
 * Component for deleting a Required OffPageNode and releated edges.
 * @param offPageNode
 * @param transportEdge
 * @param parentNodeId
 * @param dispatch
 */
export const HandleRequiredOffPageDelete = (
  offPageNode: Node,
  transportEdge: Edge,
  parentNodeId: string,
  edges: Edge[],
  dispatch: Dispatch
) => {
  const partOfEdge = GetPartOfEdge(offPageNode.id, parentNodeId, edges);
  const parentConnectorId = GetParentConnectorId(transportEdge, offPageNode.id);

  if (partOfEdge) dispatch(deleteEdge(partOfEdge.id));
  if (transportEdge) dispatch(deleteEdge(transportEdge.id));
  dispatch(setOffPageStatus(parentNodeId, parentConnectorId, false));
  if (offPageNode) dispatch(deleteNode(offPageNode.id));
};
