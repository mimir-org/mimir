import { Dispatch } from "redux";
import { FlowTransform } from "react-flow-renderer";
import { EdgeEvent } from "../../../../models/project";
import { LoadEventData, SaveEventData } from "../../../../redux/store/localStorage";
import { Connector, Node, Project } from "../../../../models";
import { IsOffPage } from "../../../../helpers";
import { GetParent, IsOutputTerminal, IsOutputVisible, IsTransport } from "../../helpers";
import { CreateRequiredOffPageNode } from "../nodes/blockNode/helpers/CreateRequiredOffPageNode";
import { Size } from "../../../../compLibrary/size/Size";
import { setValidation } from "../../../../redux/store/validation/validationSlice";
import { TextResources } from "../../../../assets/text/TextResources";

/**
 * Hook that runs when a user drags a connection from a terminal and releases the mouse button in BlockView.
 * If a connection is completed between two terminals, the hook useOnConnect runs.
 * An OffPageNode is created if the connection is released within the dropzone for an OffPageNode.
 * The dropzone is located to the left or right of the ParentBlockNode, depending on the OffPageNode type.
 * @param e
 * @param project
 * @param primaryNode
 * @param secondaryNode
 * @param transform
 * @param dispatch
 */
const useOnConnectStop = (
  e: MouseEvent,
  project: Project,
  primaryNode: Node,
  secondaryNode: Node,
  transform: FlowTransform,
  dispatch: Dispatch
) => {
  e.preventDefault();
  const edgeEvent = LoadEventData("edgeEvent") as EdgeEvent;
  if (!edgeEvent) return;

  const sourceNode = project.nodes.find((n) => n.id === edgeEvent.nodeId);
  const sourceConn = sourceNode?.connectors.find((conn) => conn.id === edgeEvent.sourceId);

  if (!IsTransport(sourceConn) || IsOffPage(sourceNode)) return;

  const existingEdge = project.edges.find(
    (x) =>
      (x.fromConnectorId === sourceConn.id && IsTransport(x.fromConnector)) ||
      (x.toConnectorId === sourceConn.id && IsTransport(x.toConnector))
  );

  if (existingEdge) {
    dispatch(setValidation({ valid: false, message: TextResources.VALIDATION_CONNECTION }));
    return;
  }

  const isValidOffPageDrop = ValidateOffPageDrop(e.clientX, transform, sourceNode, primaryNode, secondaryNode, sourceConn);
  if (!isValidOffPageDrop) return;

  const position = { x: e.clientX, y: e.clientY };
  CreateRequiredOffPageNode(sourceNode, sourceConn, position, true, dispatch);
  SaveEventData(null, "edgeEvent");
};

//#region OffPage Functions
function ValidateOffPageDrop(
  clientX: number,
  transform: FlowTransform,
  sourceNode: Node,
  primaryNode: Node,
  secondaryNode: Node,
  sourceConn: Connector
) {
  const splitView = secondaryNode !== undefined;
  const isTarget = IsOutputTerminal(sourceConn) || IsOutputVisible(sourceConn);
  const dropZone = CalculateDropZone(transform, sourceNode, primaryNode, secondaryNode, isTarget);

  if (splitView) {
    const dropZoneWidth = Size.SPLITVIEW_DISTANCE - 70;
    if (isTarget) return clientX > dropZone && clientX < dropZone + dropZoneWidth;
    return clientX < dropZone && clientX > dropZone - dropZoneWidth;
  }

  if (isTarget) return clientX > dropZone;
  return clientX < dropZone;
}

/**
 * The dropzone for an OffPageNode depends on the canvas' zoom level and position. This function handles these calculations.
 * If the OffPageNode is a source, the dropzone is located to the left of the ParentNode, else the dropzone is to the right of the ParentNode.
 * @param transform
 * @param sourceNode
 * @param primaryNode
 * @param secondaryNode
 * @param isTarget
 * @returns an X value that represents the dropzone on the canvas.
 */
function CalculateDropZone(
  transform: FlowTransform,
  sourceNode: Node,
  primaryNode: Node,
  secondaryNode: Node,
  isTarget: boolean
) {
  const parentNode = GetParent(sourceNode?.id);
  const parentPosX = parentNode?.positionBlockX;

  const isSecondaryNode = parentNode?.id === secondaryNode?.id;
  const parentNodeWidthScaled = parentNode.width * transform.zoom;

  const defaultX = Size.BLOCK_MARGIN_X;
  let dropZone = isTarget ? parentPosX + parentNodeWidthScaled : parentPosX;

  // Handle canvas scroll
  if (transform.x !== defaultX) dropZone += transform.x;

  // Handle splitView
  if (isSecondaryNode) {
    const primaryNodeWidthScaled = primaryNode.width * transform.zoom;
    const sourceDropZone = transform.x + Size.SPLITVIEW_DISTANCE + primaryNodeWidthScaled;
    const targetDropZone = transform.x + Size.SPLITVIEW_DISTANCE + primaryNodeWidthScaled + parentNodeWidthScaled;
    return isTarget ? targetDropZone : sourceDropZone;
  }

  return dropZone;
}
//#endregion

export default useOnConnectStop;
