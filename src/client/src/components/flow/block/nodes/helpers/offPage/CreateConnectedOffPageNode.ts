import { Connector, Node } from "../../../../../../models";
import { addNode, createEdge } from "../../../../../../redux/store/project/actions";
import { OffPageData } from "./CreateOffPageObject";
import { CreateOffPageObject } from "./";
import { Position } from "../../../../../../models/project";

/**
 * Component to create an OffPageNode that is connected.
 * The OffPageNode is created with a partOf edge to its parent, and a transport edge.
 * @param sourceNode
 * @param sourceConnector
 * @param position
 * @param dispatch
 */
const CreateConnectedOffPageNode = (sourceNode: Node, sourceConnector: Connector, position: Position, dispatch: any) => {
  const offPageData = {
    sourceNode: sourceNode,
    sourceConnector: sourceConnector,
    position: { x: position.x, y: position.y },
  } as OffPageData;

  const offPageObject = CreateOffPageObject(offPageData);

  dispatch(addNode(offPageObject.node));
  dispatch(createEdge(offPageObject.partOfEdge));
  dispatch(createEdge(offPageObject.transportEdge));
};

export default CreateConnectedOffPageNode;
