import { BlockNodeSize, EdgeEvent } from "../../../models/project";
import { LoadEventData, SaveEventData } from "../../../redux/store/localStorage";
import { Node, Project } from "../../../models";
import { IsOffPage } from "../../../helpers";
import { GetParent, IsOutputTerminal, IsOutputVisible } from "../helpers";
import { CreateRequiredOffPageNode } from "../block/nodes/helpers/offPage";
import { Dispatch } from "redux";

const useOnConnectStop = (
  e: MouseEvent,
  project: Project,
  parentNodeSize: BlockNodeSize,
  secondaryNode: boolean,
  dispatch: Dispatch
) => {
  e.preventDefault();
  const edgeEvent = LoadEventData("edgeEvent") as EdgeEvent;

  if (edgeEvent) {
    const sourceNode = project.nodes.find((n) => n.id === edgeEvent.nodeId);
    const sourceConnector = sourceNode.connectors.find((conn) => conn.id === edgeEvent.sourceId);
    const parentBlockNode = GetParent(sourceNode);
    const isTarget = IsOutputTerminal(sourceConnector) || IsOutputVisible(sourceConnector);

    const isOffPageDrop = ValidateOffPageDrop(
      sourceNode,
      e.clientX,
      parentNodeSize,
      isTarget,
      secondaryNode,
      parentBlockNode?.positionBlockX
    );

    if (isOffPageDrop) {
      const isRequired = true;
      CreateRequiredOffPageNode(sourceNode, sourceConnector, { x: e.clientX, y: e.clientY }, dispatch, isRequired);
      SaveEventData(null, "edgeEvent");
    }
  }
};

function ValidateOffPageDrop(
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
  const isValidPostion = ValidateOffPagePosition(clientX, leftBound, rightBound, dropZoneWidth, secondaryNode, isTarget);
  console.log(sourceNode, clientX, leftBound);

  return !IsOffPage(sourceNode) && isValidPostion;
}

function ValidateOffPagePosition(
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
