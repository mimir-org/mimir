import { createRequiredOffPageNode } from "../../../../../../redux/store/project/actions";
import { CreateOffPageObject } from "./CreateOffPageObject";
import { OffPageData } from "../../../../../../models/project";
import { Dispatch } from "redux";

/**
 * Component to create a required OffPageNode.
 * The OffPageNode is created with a partOf edge to its parent, and a transport edge.
 * This component is called from the HandleRequiredOffPageNode component or the useOnConnectStop hook.
 * @param data
 * @param dispatch
 */
export const CreateRequiredOffPageNode = (data: OffPageData, dispatch: Dispatch) => {
  const offPageObject = CreateOffPageObject(data);
  dispatch(createRequiredOffPageNode(data.sourceNode.id, data.sourceConnector.id, data.isRequired, offPageObject));
};
