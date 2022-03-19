import { BlockNodeSize, EdgeEvent } from "../../../models/project";
import { LoadEventData, SaveEventData } from "../../../redux/store/localStorage";
import { Connector, Node, Project } from "../../../models";
import { IsOffPage } from "../../../helpers";
import { GetParent, IsOutputTerminal, IsOutputVisible, IsTransport } from "../helpers";
import { CreateRequiredOffPageNode } from "../block/nodes/blockNode/helpers/CreateRequiredOffPageNode";
import { Dispatch } from "redux";
import { Size } from "../../../compLibrary/size";
import { setValidation } from "../../../redux/store/validation/validationSlice";
import { TextResources } from "../../../assets/text";
import { FlowTransform } from "react-flow-renderer";

/**
 * Hook that runs when a user drags a connection from a terminal and releases the mouse button.
 * If a connection is completed between two terminals, the hook useOnConnect runs.
 * An OffPageNode is created if the connection is released within the dropzone for an OffPageNode.
 * The dropzone is located to the left or right of the ParentBlockNode, depending on the OffPageNode type.
 * @param e
 * @param project
 * @param parentNodeSize
 * @param secondaryNode
 * @param transform
 * @param dispatch
 */
const useOnConnectStop = (
  e: MouseEvent,
  project: Project,
  parentNodeSize: BlockNodeSize,
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
    dispatch(setValidation({ valid: false, message: TextResources.Validation_Connectors }));
    return;
  }

  const isValidOffPageDrop = ValidateOffPageDrop(e.clientX, transform, sourceNode, secondaryNode, sourceConn, parentNodeSize);

  if (!isValidOffPageDrop) return;
  CreateRequiredOffPageNode(sourceNode, sourceConn, { x: e.clientX, y: e.clientY }, true, dispatch);
  SaveEventData(null, "edgeEvent");
};

//#region OffPage Functions
function ValidateOffPageDrop(
  clientX: number,
  transform: FlowTransform,
  sourceNode: Node,
  secondaryNode: Node,
  sourceConn: Connector,
  parentNodeSize: BlockNodeSize
) {
  const splitView = secondaryNode !== undefined;
  const isTarget = IsOutputTerminal(sourceConn) || IsOutputVisible(sourceConn);
  const dropZone = CalculateDropZone(transform, sourceNode, secondaryNode, parentNodeSize, isTarget);

  if (splitView) {
    const dropZoneWidth = Size.SPLITVIEW_DISTANCE;
    if (isTarget) return clientX > dropZone && clientX < dropZone + dropZoneWidth;
    return clientX < dropZone && clientX > dropZone - dropZoneWidth;
  }

  if (isTarget) return clientX > dropZone;
  return clientX < dropZone;
}

/**
 * The dropzone for an OffPageNode depends on the canvas' zoom level and position. This function handles those calculations.
 * If the OffPageNode is a source, the dropzone is located to the left of the ParentNode, else the dropzone is to the right of the ParentNode.
 * @param transform
 * @param sourceNode
 * @param secondaryNode
 * @param parentNodeSize
 * @param isTarget
 * @returns an X value that represents the dropzone on the canvas.
 */
function CalculateDropZone(
  transform: FlowTransform,
  sourceNode: Node,
  secondaryNode: Node,
  parentNodeSize: BlockNodeSize,
  isTarget: boolean
) {
  const parentNode = GetParent(sourceNode);
  const parentPosX = parentNode?.positionBlockX;
  const isSecondaryNode = parentNode?.id === secondaryNode?.id;
  const parentNodeWidthScaled = parentNodeSize.width * transform.zoom;
  const defaultX = Size.BLOCK_MARGIN_X;

  let dropZone = isTarget ? parentPosX + parentNodeWidthScaled : parentPosX;

  // Handle canvas scroll
  if (transform.x !== defaultX) dropZone += transform.x;

  // Handle splitView
  if (isSecondaryNode) {
    const targetDropZone = transform.x + Size.SPLITVIEW_DISTANCE + parentNodeWidthScaled * 2;
    const sourceDropZone = transform.x + Size.SPLITVIEW_DISTANCE + parentNodeWidthScaled;
    return isTarget ? targetDropZone : sourceDropZone;
  }

  return dropZone;
}
//#endregion

export default useOnConnectStop;
