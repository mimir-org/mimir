import { Connector, Node } from "../../../../../../models";
import { createRequiredOffPageNode } from "../../../../../../redux/store/project/actions";
import { CreateOffPageObject, OffPageData } from "./CreateOffPageObject";
import { Position } from "../../../../../../models/project";
import { Dispatch } from "redux";

/**
 * Component to create a required OffPageNode.
 * The OffPageNode is created with a partOf edge to its parent, and a transport edge.
 * This component is called from the HandleRequiredOffPageNode component or the useOnConnectStop hook.
 * @param sourceNode
 * @param sourceConnector
 * @param position
 * @param isRequired
 * @param dispatch
 */
export const CreateRequiredOffPageNode = (
  sourceNode: Node,
  sourceConnector: Connector,
  position: Position,
  isRequired: boolean,
  dispatch: Dispatch
) => {
  const offPageData = {
    sourceNode,
    sourceConnector,
    position,
  } as OffPageData;

  const offPageObject = CreateOffPageObject(offPageData);
  dispatch(createRequiredOffPageNode(sourceNode.id, sourceConnector.id, isRequired, offPageObject));
};
