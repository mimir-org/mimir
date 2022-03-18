import { Connector, Node } from "../../../../../../models";
import { createRequiredOffPageNode } from "../../../../../../redux/store/project/actions";
import { CreateOffPageObject, OffPageData } from "./CreateOffPageObject";
import { Position } from "../../../../../../models/project";
import { Dispatch } from "redux";

/**
 * Component to create a required OffPageNode. The OffPageNode is created with a partOf edge to its parent, and a transport edge.
 * @param sourceNode
 * @param sourceConnector
 * @param position
 * @param splitView
 * @param isRequired
 * @param dispatch
 */
export const CreateRequiredOffPageNode = (
  sourceNode: Node,
  sourceConnector: Connector,
  position: Position,
  splitView: boolean,
  isRequired: boolean,
  dispatch: Dispatch
) => {
  const offPageData = {
    sourceNode,
    sourceConnector,
    position: { x: position.x, y: position.y },
    splitView,
  } as OffPageData;

  const offPageObject = CreateOffPageObject(offPageData);
  dispatch(createRequiredOffPageNode(sourceNode.id, sourceConnector.id, isRequired, offPageObject));
};
