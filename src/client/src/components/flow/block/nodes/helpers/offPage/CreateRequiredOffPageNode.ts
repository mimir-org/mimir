import { Connector, Node } from "../../../../../../models";
import { addNode, createEdge, setOffPageStatus } from "../../../../../../redux/store/project/actions";
import { OffPageData } from "./CreateOffPageObject";
import { CreateOffPageObject } from ".";
import { Position } from "../../../../../../models/project";
import { Dispatch } from "redux";

/**
 * Component to create a required OffPageNode. The OffPageNode is created with a partOf edge to its parent, and a transport edge.
 * @param sourceNode
 * @param sourceConnector
 * @param position
 * @param dispatch
 * @param isRequired
 */
const CreateRequiredOffPageNode = (
  sourceNode: Node,
  sourceConnector: Connector,
  position: Position,
  dispatch: Dispatch,
  isRequired: boolean
) => {
  const offPageData = {
    sourceNode: sourceNode,
    sourceConnector: sourceConnector,
    position: { x: position.x, y: position.y },
  } as OffPageData;

  const offPageObject = CreateOffPageObject(offPageData);

  dispatch(setOffPageStatus(sourceNode.id, sourceConnector.id, isRequired));
  dispatch(addNode(offPageObject.node));
  dispatch(createEdge(offPageObject.partOfEdge));
  dispatch(createEdge(offPageObject.transportEdge));
};

export default CreateRequiredOffPageNode;
