import { Connector, Node } from "../../../../../../models";
import { createConnectedOffPageNode } from "../../../../../../redux/store/project/actions";
import { OffPageData, CreateOffPageObject } from "./CreateOffPageObject";
import { Position } from "../../../../../../models/project";
import { Dispatch } from "redux";

/**
 * Component to create an OffPageNode that is connected.
 * The OffPageNode is created with a partOf edge to its parent, and a transport edge.
 *
 * @param sourceNode
 * @param sourceConnector
 * @param position
 * @param splitView
 * @param dispatch
 */
export const CreateConnectedOffPageNode = (
  sourceNode: Node,
  sourceConnector: Connector,
  position: Position,
  splitView: boolean,
  dispatch: Dispatch
) => {
  const offPageData: OffPageData = {
    sourceNode,
    sourceConnector,
    position: { x: position.x, y: position.y },
    splitView,
  };

  const offPageObject = CreateOffPageObject(offPageData);
  dispatch(createConnectedOffPageNode(offPageObject));
};
