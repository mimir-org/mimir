import { BlockNodeSize, EdgeEvent } from "../../../models/project";
import { LoadEventData, SaveEventData } from "../../../redux/store/localStorage";
import { Project, Node } from "../../../models";
import { GetSelectedNode, IsOffPage, IsProduct } from "../../../helpers";
import { GetParent, IsOutputTerminal, IsOutputVisible } from "../helpers";
import { CreateRequiredOffPageNode } from "../block/nodes/blockNode/helpers/CreateRequiredOffPageNode";
import { Dispatch } from "redux";

/**
 * Hook that runs when a user drags a connection from a terminal, and releases the mouse button.
 * This is where an OffPage node can be created.
 * @param e
 * @param project
 * @param parentNodeSize
 * @param secondaryNode
 * @param dispatch
 */
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
    const parentBlockNode = IsProduct(sourceNode) ? GetSelectedNode() : GetParent(sourceNode);
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
  if (IsOffPage(sourceNode)) return false;

  // Correct value of clientX to match the nodes
  clientX += 100;

  let leftBound = isTarget ? parentNodeSize?.width : parentXPos;
  if (secondaryNode) leftBound = isTarget ? parentXPos + parentNodeSize?.width : parentXPos;

  const dropZoneWidth = secondaryNode ? 100 : 200;
  const rightBound = leftBound + dropZoneWidth;

  return ValidateOffPagePosition(clientX, leftBound, rightBound, dropZoneWidth, secondaryNode, isTarget);
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
