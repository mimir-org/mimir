import { GetViewport } from "react-flow-renderer";
import { Dispatch } from "redux";
import { EdgeEvent, OffPageData, Position } from "../../../../models/project";
import { LoadEventData, SaveEventData } from "../../../../redux/store/localStorage";
import { Node, Connector, Project } from "@mimirorg/modelbuilder-types";
import { IsOffPage } from "../../../../helpers/Aspects";
import { IsOutputConnector, IsOutputVisible, IsTerminal } from "../../helpers/Connectors";
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
 * @param project
 * @param primaryNode
 * @param secondaryNode
 * @param getViewport
 * @param isElectroView
 * @param dispatch
 */
const useOnConnectStop = (
  e: MouseEvent,
  project: Project,
  primaryNode: Node,
  secondaryNode: Node,
  getViewport: GetViewport,
  isElectroView: boolean,
  dispatch: Dispatch
) => {
  e.preventDefault();
  const edgeEvent = LoadEventData("edgeEvent") as EdgeEvent;
  if (!edgeEvent) return;

  const nodes = project?.nodes ?? [];
  const edges = project?.edges ?? [];

  const sourceNode = nodes.find((n) => n.id === edgeEvent.nodeId);
  const sourceConnector = sourceNode?.connectors.find((conn) => conn.id === edgeEvent.sourceId);

  if (!IsTerminal(sourceConnector) || IsOffPage(sourceNode)) return;

  const existingEdge = edges.find(
    (edge) =>
      (edge.fromConnectorId === sourceConnector.id && IsTerminal(edge.fromConnector)) ||
      (edge.toConnectorId === sourceConnector.id && IsTerminal(edge.toConnector))
  );

  if (existingEdge) {
    dispatch(setValidation({ valid: false, message: TextResources.VALIDATION_CONNECTION }));
    return;
  }

  if (!ValidateOffPageDrop(nodes, e.clientX, getViewport, sourceNode, primaryNode, secondaryNode, sourceConnector)) return;

  const position = SetInitialOffPageNodePosition(primaryNode, sourceNode, e.clientX, isElectroView);
  const offPageData = { sourceNode, sourceConnector, position, isRequired: true } as OffPageData;

  CreateRequiredOffPageNode(offPageData, dispatch);
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
  const isTarget = IsOutputConnector(sourceConn) || IsOutputVisible(sourceConn);
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

/**
 * Function to give an OffPage node a position on the creation of an OffPageNode.
 * If Mimir is in ElectroView mode the OffPage node will be placed at the top or bottom on the ParentNode,
 * else it is placed at the left or right of the ParentNode.
 * Note: this function is only used once, when the OffPageNode is created.
 * When a position is updated it is handled by the component SetOffPageNodePos component.
 * @param primaryNode
 * @param sourceNode
 * @param clientX
 * @param isElectroView
 * @returns a Position object.
 */
function SetInitialOffPageNodePosition(primaryNode: Node, sourceNode: Node, clientX: number, isElectroView: boolean) {
  const position = { x: clientX, y: sourceNode.positionBlockY + Size.NODE_HEIGHT } as Position; // Adjust relative to parent

  if (isElectroView) {
    position.x = sourceNode.positionBlockX;
    position.y = primaryNode.positionBlockY + primaryNode.height;
  }

  return position;
}

export default useOnConnectStop;
