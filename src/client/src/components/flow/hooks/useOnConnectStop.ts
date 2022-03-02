import { BlockNodeSize, EdgeEvent } from "../../../models/project";
import { LoadEventData, SaveEventData } from "../../../redux/store/localStorage";
import { Project, Node } from "../../../models";
import { IsOffPage } from "../../../helpers";
import { GetParent, IsOutputTerminal, IsOutputVisible } from "../helpers";
import { CreateRequiredOffPageNode } from "../block/nodes/blockNode/helpers/CreateRequiredOffPageNode";
import { Dispatch } from "redux";
import { Size } from "../../../compLibrary/size";

/**
 * Hook that runs when a user drags a connection from a terminal, and releases the mouse button.
 * If a connection is completed between two terminals, the hook useOnConnect runs.
 * An OffPageNode is created if the connection is released within the dropzone for an OffPageNode.
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
  zoomLevel: number,
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
      zoomLevel,
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
  zoomLevel: number,
  isTarget: boolean,
  secondaryNode: boolean,
  parentXPos: number
) {
  if (IsOffPage(sourceNode)) return false;

  const leftBound = CalculateLeftBound(zoomLevel, isTarget, parentNodeSize, parentXPos, secondaryNode);
  console.log({ clientX });
  console.log({ leftBound });
  console.log({ zoomLevel });

  const dropZoneWidth = secondaryNode ? 100 : 200;
  const rightBound = leftBound + dropZoneWidth;

  return ValidateOffPagePosition(clientX, leftBound, rightBound, dropZoneWidth, secondaryNode, isTarget);
}

function CalculateLeftBound(
  zoom: number,
  isTarget: boolean,
  parentNodeSize: BlockNodeSize,
  parentXPos: number,
  secondaryNode: boolean
) {
  const defaultZoom = Size.Block_DefaultZoomLevel;

  let leftBound = isTarget ? parentXPos + parentNodeSize?.width : parentXPos;
  // if (secondaryNode) leftBound = isTarget ? parentXPos + parentNodeSize?.width : parentXPos;

  if (zoom !== defaultZoom) {
    let diff = 0;

    if (zoom < defaultZoom) {
      const width = parentNodeSize?.width * zoom;
      leftBound = parentXPos + width;
    } else {
      diff = zoom - defaultZoom;
      leftBound += leftBound * diff;
    }
  }
  return leftBound;
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
