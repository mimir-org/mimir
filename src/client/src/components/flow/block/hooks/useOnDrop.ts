import { Dispatch } from "redux";
import { Size } from "../../../../compLibrary/size/Size";
import { addNode } from "../../../../redux/store/project/actions";
import { ConvertToNode } from "../../converters";
import { LibraryState } from "../../../../redux/store/library/types";
import { GetSelectedNode, IsFamily } from "../../../../helpers";
import { FlowTransform, OnLoadParams } from "react-flow-renderer";
import { BlobData, LibItem, Node, Project, User } from "../../../../models";
import { HandleCreatePartOfEdge, InitConnectorVisibility, SetTreeNodePosition } from "../../helpers/LibraryDrop";
import { Position } from "../../../../models/project";

export const DATA_TRANSFER_APPDATA_TYPE = "application/reactflow";

interface OnDropParameters {
  event: React.DragEvent<HTMLDivElement>;
  project: Project;
  user: User;
  icons: BlobData[];
  library: LibraryState;
  secondaryNodeRef: Node;
  flowTransform: FlowTransform;
  flowInstance: OnLoadParams;
  flowWrapper: React.MutableRefObject<HTMLDivElement>;
  dispatch: Dispatch;
}

/**
 * Hook that runs when a Node from the LibraryModule is dropped onto the Mimir canvas in BlockView.
 * A partOf Edge is created from the dropped Node to its parent.
 * The parent is the selectedNode or the secondaryParentNode.
 * @param params
 */
const useOnDrop = (params: OnDropParameters) => {
  const { event } = params;
  event.stopPropagation();
  event.preventDefault();

  if (DoesNotContainApplicationData(event)) return;

  HandleNodeDrop(params);
};

const DoesNotContainApplicationData = (event: React.DragEvent<HTMLDivElement>) =>
  !event.dataTransfer.types.includes(DATA_TRANSFER_APPDATA_TYPE);

function HandleNodeDrop({ event, project, user, icons, library, secondaryNodeRef, flowTransform, dispatch }: OnDropParameters) {
  const data = JSON.parse(event.dataTransfer.getData(DATA_TRANSFER_APPDATA_TYPE)) as LibItem;
  let parentNode = GetSelectedNode();
  if (!parentNode) return;

  // Handle drop in SplitView
  if (secondaryNodeRef) {
    const dropZone = CalculateSecondaryNodeDropZone(flowTransform, parentNode);
    parentNode = FindParent(data, parentNode, secondaryNodeRef, dropZone, event.clientX);
    if (!parentNode) return;
  }

  const treePosition = SetTreeNodePosition(parentNode, project);
  const blockPosition = SetBlockNodePosition(flowTransform, event);
  const targetNode = ConvertToNode(data, treePosition, blockPosition, project.id, icons, user);
  if (!targetNode) return;

  targetNode.connectors?.forEach((connector) => (connector.connectorVisibility = InitConnectorVisibility(connector, targetNode)));
  if (IsFamily(parentNode, targetNode)) HandleCreatePartOfEdge(parentNode, targetNode, project, library, dispatch);

  dispatch(addNode(targetNode));
}

/**
 * Function to calculate the BlockView position of a dropped Node.
 * @param transform
 * @param event
 * @returns a Position object.
 */
function SetBlockNodePosition(transform: FlowTransform, event: React.DragEvent<HTMLDivElement>) {
  const defaultMarginX = 45;
  const defaultMarginY = 43;
  let x = event.clientX - defaultMarginX - transform.x;
  let y = event.clientY - defaultMarginY - transform.y;

  if (transform.zoom < Size.ZOOM_DEFAULT) {
    const absX = Math.abs(transform.x - event.clientX);
    const absY = Math.abs(transform.y - event.clientY);
    x = event.clientX + absX;
    y = event.clientY + absY;
  }

  return { x, y } as Position;
}

/**
 * Function to define the dropzone for a SecondaryNode.
 * A Node will have the SecondaryNode as parent if dropped over its area.
 * @param transform
 * @returns an X value where the SecondaryNode is placed.
 */
function CalculateSecondaryNodeDropZone(transform: FlowTransform, primaryNode: Node) {
  const parentNodeWidthScaled = primaryNode.width * transform.zoom;
  return transform.x + parentNodeWidthScaled + Size.SPLITVIEW_DISTANCE;
}

/**
 * Function to determine which parentNode in SplitView that is the parent of a dropped Node.
 * @param targetNode
 * @param selectedNode
 * @param secondaryNode
 * @param dropZone
 * @param clientX
 * @returns a Node.
 */
function FindParent(targetNode: LibItem, selectedNode: Node, secondaryNode: Node, dropZone: number, clientX: number) {
  if (!IsFamily(targetNode, selectedNode) && !IsFamily(targetNode, secondaryNode)) return null;
  if (!IsFamily(targetNode, selectedNode)) return secondaryNode;
  if (!IsFamily(targetNode, secondaryNode)) return selectedNode;
  return clientX < dropZone ? selectedNode : secondaryNode;
}

export default useOnDrop;
