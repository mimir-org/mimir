import { BlockNodeSize, EdgeEvent } from "../../../models/project";
import { LoadEventData, SaveEventData } from "../../../redux/store/localStorage";
import { Project } from "../../../models";
import { IsOffPage } from "../../../helpers";
import { GetParent, IsOutputTerminal, IsOutputVisible, IsTransport } from "../helpers";
import { CreateRequiredOffPageNode } from "../block/nodes/blockNode/helpers/CreateRequiredOffPageNode";
import { Dispatch } from "redux";
import { Size } from "../../../compLibrary/size";
import { setValidation } from "../../../redux/store/validation/validationSlice";
import { TextResources } from "../../../assets/text";
import { FlowTransform } from "react-flow-renderer";

/**
 * Hook that runs when a user drags a connection from a terminal, and releases the mouse button.
 * If a connection is completed between two terminals, the hook useOnConnect runs.
 * An OffPageNode is created if the connection is released within the dropzone for an OffPageNode.
 * @param e
 * @param project
 * @param parentNodeSize
 * @param secondaryNode
 * @param flowTransform
 * @param dispatch
 */
const useOnConnectStop = (
  e: MouseEvent,
  project: Project,
  parentNodeSize: BlockNodeSize,
  secondaryNode: boolean,
  flowTransform: FlowTransform,
  dispatch: Dispatch
) => {
  e.preventDefault();
  const edgeEvent = LoadEventData("edgeEvent") as EdgeEvent;

  if (edgeEvent) {
    const sourceNode = project.nodes.find((n) => n.id === edgeEvent.nodeId);
    const sourceConnector = sourceNode?.connectors.find((conn) => conn.id === edgeEvent.sourceId);
    if (!IsTransport(sourceConnector) || IsOffPage(sourceNode)) return;

    const existingEdge = project.edges.find(
      (edge) =>
        (edge.fromConnectorId === sourceConnector?.id && IsTransport(edge.fromConnector)) ||
        (edge.toConnectorId === sourceConnector?.id && IsTransport(edge.toConnector))
    );

    if (existingEdge !== undefined) {
      dispatch(setValidation({ valid: false, message: TextResources.Validation_Connectors }));
      return;
    }

    const parentBlockNode = GetParent(sourceNode);
    const isTarget = IsOutputTerminal(sourceConnector) || IsOutputVisible(sourceConnector);

    const isValidOffPageDrop = ValidateOffPagePosition(
      e.clientX,
      flowTransform,
      parentNodeSize,
      parentBlockNode?.positionBlockX,
      secondaryNode,
      isTarget
    );

    if (isValidOffPageDrop) {
      const isRequired = true;
      CreateRequiredOffPageNode(sourceNode, sourceConnector, { x: e.clientX, y: e.clientY }, dispatch, isRequired);
      SaveEventData(null, "edgeEvent");
    }
  }
};

function ValidateOffPagePosition(
  clientX: number,
  flowTransform: FlowTransform,
  parentNodeSize: BlockNodeSize,
  parentXPos: number,
  secondaryNode: boolean,
  isTarget: boolean
) {
  const leftBound = CalculateLeftBound(flowTransform, isTarget, parentNodeSize, parentXPos);

  if (secondaryNode) {
    const dropZoneWidth = 100;
    const rightBound = leftBound + dropZoneWidth;

    if (isTarget) return clientX > leftBound && clientX < rightBound;
    return clientX < leftBound && clientX > leftBound - dropZoneWidth;
  }

  if (isTarget) return clientX > leftBound;
  return clientX < leftBound;
}

function CalculateLeftBound(flowTransform: FlowTransform, isTarget: boolean, parentNodeSize: BlockNodeSize, parentXPos: number) {
  const defaultZoom = Size.DEFAULT_ZOOM_LEVEL;
  const zoom = flowTransform.zoom;
  const leftBound = isTarget ? parentXPos + parentNodeSize?.width : parentXPos;

  if (zoom < defaultZoom) {
    const parentNodeWidthScaled = parentNodeSize?.width * zoom;
    const canvasCenterX = window.innerWidth / 2;
    const targetLeftBound = canvasCenterX + parentNodeWidthScaled / 2;
    const sourceLeftBound = canvasCenterX - parentNodeWidthScaled / 2;
    return isTarget ? targetLeftBound : sourceLeftBound;
  }
  if (zoom > defaultZoom) {
    const diff = zoom - defaultZoom;
    const targetLeftBound = leftBound * diff;
    const sourceLeftBound = parentXPos - leftBound * zoom;
    return isTarget ? targetLeftBound : sourceLeftBound;
  }

  return leftBound;
}

export default useOnConnectStop;
