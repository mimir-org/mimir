import { Dispatch } from "redux";
import { deleteNode, setOffPageStatus } from "../../../../../../redux/store/project/actions";

/**
 * Component to delete a required OffPageNode.
 * @param offPageNodeToDeleteId
 * @param sourceNodeId
 * @param sourceConnectorId
 * @param dispatch
 */
export const DeleteRequiredOffPageNode = (
  offPageNodeToDeleteId: string,
  sourceNodeId: string,
  sourceConnectorId: string,
  dispatch: Dispatch
) => {
  const isRequired = false;

  dispatch(deleteNode(offPageNodeToDeleteId));
  dispatch(setOffPageStatus(sourceNodeId, sourceConnectorId, isRequired));
};
