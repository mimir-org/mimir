import { GetViewport } from "react-flow-renderer";
import { Dispatch } from "redux";
import { EdgeEvent } from "../../../../models/project";
import { LoadEventData, SaveEventData } from "../../../../redux/store/localStorage";
import { Node, Edge, Connector } from "@mimirorg/modelbuilder-types";
import { IsOffPage } from "../../../../helpers/Aspects";
import { IsOutputTerminal, IsOutputVisible, IsTerminal } from "../../helpers/Connectors";
import { CreateRequiredOffPageNode } from "../nodes/blockNode/helpers/CreateRequiredOffPageNode";
import { Size } from "../../../../assets/size/Size";
import { setValidation } from "../../../../redux/store/validation/validationSlice";
import { TextResources } from "../../../../assets/text/TextResources";

/**
 * Hook that runs when a user drags a connection from a terminal and releases the mouse button in BlockView.
 * If a connection is completed between two terminals, the hook useOnConnect runs.
 * An OffPageNode is created if the connection is released within the dropzone for an OffPageNode.
 * The dropzone is located to the left or right of the ParentBlockNode, depending on the OffPageNode type.
 * @param e
 * @param nodes
 * @param edges
 * @param primaryNode
 * @param secondaryNode
 * @param getViewport
 * @param dispatch
 */
const useOnConnectStop = (
  e: MouseEvent,
  nodes: Node[],
  edges: Edge[],
  primaryNode: Node,
  secondaryNode: Node,
  getViewport: GetViewport,
  dispatch: Dispatch
) => {
  e.preventDefault();
  const edgeEvent = LoadEventData("edgeEvent") as EdgeEvent;
  if (!edgeEvent) return;

  const sourceNode = nodes.find((n) => n.id === edgeEvent.nodeId);
  const sourceConn = sourceNode?.connectors.find((conn) => conn.id === edgeEvent.sourceId);

  if (!IsTerminal(sourceConn) || IsOffPage(sourceNode)) return;

  const existingEdge = edges.find(
    (edge) =>
      (edge.fromConnectorId === sourceConn.id && IsTerminal(edge.fromConnector)) ||
      (edge.toConnectorId === sourceConn.id && IsTerminal(edge.toConnector))
  );

  if (existingEdge) {
    dispatch(setValidation({ valid: false, message: TextResources.VALIDATION_CONNECTION }));
    return;
  }

  if (!ValidateOffPageDrop(nodes, e.clientX, getViewport, sourceNode, primaryNode, secondaryNode, sourceConn)) return;

  const position = { x: e.clientX, y: e.clientY };
  CreateRequiredOffPageNode(sourceNode, sourceConn, position, true, dispatch);
  SaveEventData(null, "edgeEvent");
};

/**
 * Function to validate if a mouse drag is a valid OffPage drop.
 * A drop is valid if the mouse is released within the zones for generating an OffPageNode.
 * These zones are generated in CalculateDropZone.
 * @param nodes
 * @param clientX
 * @param getViewPort
 * @param sourceNode
 * @param primaryNode
 * @param secondaryNode
 * @param sourceConn
 * @returns a boolean value.
 */
function ValidateOffPageDrop(
  nodes: Node[],
  clientX: number,
  getViewPort: GetViewport,
  sourceNode: Node,
  primaryNode: Node,
  secondaryNode: Node,
  sourceConn: Connector
) {
  const splitView = secondaryNode != undefined;
  const isTarget = IsOutputTerminal(sourceConn) || IsOutputVisible(sourceConn);
  const dropZone = CalculateDropZone(getViewPort, nodes, sourceNode, primaryNode, secondaryNode, isTarget);

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
 * If the OffPageNode is a source, the dropzone is located to the left of the ParentNode.
 * If the OffPageNode is a target, the dropzone is located to the right of the ParentNode.
 * If splitView is activated, the dropzone is a little more delicate. The area between the two parent nodes serves as a dropzone,
 * in addition to the area left of the primaryNode, and the area to the right of the secondaryNode.
 * @param getViewPort
 * @param nodes
 * @param sourceNode
 * @param primaryNode
 * @param secondaryNode
 * @param isTarget
 * @returns an X value that represents the dropzone on the canvas.
 */
function CalculateDropZone(
  getViewPort: GetViewport,
  nodes: Node[],
  sourceNode: Node,
  primaryNode: Node,
  secondaryNode: Node,
  isTarget: boolean
) {
  const zoom = getViewPort().zoom;
  const x = getViewPort().x;

  const parentNode = nodes.find((n) => n.id === sourceNode.parentNodeId);
  const parentPosX = parentNode?.positionBlockX;

  const isSecondaryNode = parentNode?.id === secondaryNode?.id;
  const parentNodeWidthScaled = parentNode?.width * zoom;

  const defaultX = Size.BLOCK_MARGIN_X;
  let dropZone = isTarget ? parentPosX + parentNodeWidthScaled : parentPosX;

  // Handle canvas scroll
  if (x !== defaultX) dropZone += x;

  // Handle splitView
  if (isSecondaryNode) {
    const primaryNodeWidthScaled = primaryNode.width * zoom;
    const sourceDropZone = x + Size.SPLITVIEW_DISTANCE + primaryNodeWidthScaled;
    const targetDropZone = x + Size.SPLITVIEW_DISTANCE + primaryNodeWidthScaled + parentNodeWidthScaled;
    return isTarget ? targetDropZone : sourceDropZone;
  }

  return dropZone;
}

export default useOnConnectStop;
