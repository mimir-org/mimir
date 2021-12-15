import { BlockNodeSize, EdgeEvent } from "../../../models/project";
import { createEdge, addNode, setOffPageStatus } from "../../../redux/store/project/actions";
import { LoadEventData, SaveEventData } from "../../../redux/store/localStorage";
import { BuildOffPageNode } from "../block/builders";
import { OffPageData } from "../block/builders/BuildOffPageNode";
import { Project, Node } from "../../../models";
import { IsOffPage } from "../../../helpers";
import { GetParent, IsOutputTerminal } from "../helpers";

const useOnConnectStop = (e, project: Project, parentNodeSize: BlockNodeSize, secondaryNode: boolean, dispatch: any) => {
  e.preventDefault();
  const edgeEvent = LoadEventData("edgeEvent") as EdgeEvent;

  if (edgeEvent) {
    const sourceNode = project.nodes.find((n) => n.id === edgeEvent.nodeId);
    const sourceConnector = sourceNode.connectors.find((conn) => conn.id === edgeEvent.sourceId);
    const parentBlockNode = GetParent(sourceNode);
    const isTarget = IsOutputTerminal(sourceConnector);

    const validDrop = IsValidDrop(
      sourceNode,
      e.clientX,
      parentNodeSize,
      isTarget,
      secondaryNode,
      parentBlockNode?.positionBlockX
    );

    if (validDrop) {
      const offPageData = {
        sourceNode: sourceNode,
        sourceConnector: sourceConnector,
        position: { x: e.clientX, y: e.clientY },
      } as OffPageData;

      const offPageObject = BuildOffPageNode(offPageData);

      dispatch(addNode(offPageObject.node));
      dispatch(createEdge(offPageObject.partOfEdge));
      dispatch(createEdge(offPageObject.transportEdge));
      dispatch(setOffPageStatus(edgeEvent.nodeId, edgeEvent.sourceId, true));

      SaveEventData(null, "edgeEvent");
    }
  }
};

function IsValidDrop(
  sourceNode: Node,
  clientX: number,
  parentNodeSize: BlockNodeSize,
  isTarget: boolean,
  secondaryNode: boolean,
  parentXPos: number
) {
  const marginX = 90;
  clientX += marginX;

  let leftBound = isTarget ? parentNodeSize?.width : parentXPos;
  if (secondaryNode) leftBound = isTarget ? parentXPos + parentNodeSize?.width : parentXPos;

  const dropZoneWidth = 200;
  const rightBound = leftBound + dropZoneWidth;
  const isValidPostion = ValidatePosition(clientX, leftBound, rightBound, dropZoneWidth, secondaryNode, isTarget);

  return !IsOffPage(sourceNode) && isValidPostion;
}

function ValidatePosition(
  clientX: number,
  leftBound: number,
  rightBound: number,
  dropZoneWidth: number,
  secondaryNode: boolean,
  isTarget: boolean
) {
  if (secondaryNode) {
    if (isTarget) return clientX > leftBound && clientX < rightBound;
    return clientX < leftBound && clientX > leftBound - dropZoneWidth;
  }

  if (isTarget) return clientX > leftBound;
  return clientX < leftBound;
}

export default useOnConnectStop;
