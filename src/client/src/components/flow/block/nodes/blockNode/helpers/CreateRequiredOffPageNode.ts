import { createRequiredOffPageNode } from "../../../../../../redux/store/project/actions";
import { CreateOffPageObject, OffPageData } from "./CreateOffPageObject";
import { Position } from "../../../../../../models/project";
import { Dispatch } from "redux";
import { Node, Terminal } from "@mimirorg/modelbuilder-types";

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
  sourceConnector: Terminal,
  position: Position,
  isRequired: boolean,
  dispatch: Dispatch
) => {
  const data = {
    sourceNode,
    sourceConnector,
    position,
    isRequired,
  } as OffPageData;

  const offPageObject = CreateOffPageObject(data);
  dispatch(createRequiredOffPageNode(sourceNode.id, sourceConnector.id, isRequired, offPageObject));
};
