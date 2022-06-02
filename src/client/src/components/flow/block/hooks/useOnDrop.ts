import { GetViewport, ReactFlowInstance } from "react-flow-renderer";
import { Dispatch } from "redux";
import { addNode } from "../../../../redux/store/project/actions";
import { ConvertDataToNode } from "../../converters";
import { LibraryState } from "../../../../redux/store/library/types";
import { Node, Project, User } from "../../../../models";
import { HandleCreatePartOfEdge, InitConnectorVisibility, SetTreeNodePosition } from "../../helpers/LibraryDrop";
import { Size } from "../../../../compLibrary/size/Size";
import { Position } from "../../../../models/project";
import { IsFamily } from "../../../../helpers/Family";
import { NodeLibCm } from "@mimirorg/typelibrary-types";

export const DATA_TRANSFER_APPDATA_TYPE = "application/reactflow";

interface OnDropParameters {
  event: React.DragEvent<HTMLDivElement>;
  project: Project;
  user: User;
  lib: LibraryState;
  selectedNode: Node;
  secondaryNode: Node;
  instance: ReactFlowInstance;
  getViewport: GetViewport;
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
  HandleDrop(params);
};

const DoesNotContainApplicationData = (event: React.DragEvent<HTMLDivElement>) =>
  !event.dataTransfer.types.includes(DATA_TRANSFER_APPDATA_TYPE);

/**
 * Function to handle the drop from the Library Module.
 * @param params
 */
function HandleDrop({ event, project, user, lib, selectedNode, secondaryNode, getViewport, dispatch }: OnDropParameters) {
  const data = JSON.parse(event.dataTransfer.getData(DATA_TRANSFER_APPDATA_TYPE)) as NodeLibCm;

  let parentNode = selectedNode;
  if (!parentNode) return;

  // Handle drop in SplitView
  if (secondaryNode) {
    const dropZone = CalculateSecondaryNodeDropZone(getViewport, parentNode);
    parentNode = FindParent(data, parentNode, secondaryNode, dropZone, event.clientX);
    if (!parentNode) return;
  }

  const treePosition = SetTreeNodePosition(parentNode, project.nodes, project.edges);
  const blockPosition = SetBlockNodePosition(getViewport, event);

  const targetNode = ConvertDataToNode(data, treePosition, parentNode, blockPosition, project.id, user);
  if (!targetNode) return;

  targetNode.connectors?.forEach((connector) => (connector.connectorVisibility = InitConnectorVisibility(connector, targetNode)));
  if (IsFamily(parentNode, targetNode)) HandleCreatePartOfEdge(parentNode, targetNode, project, lib, dispatch);

  dispatch(addNode(targetNode));
}

/**
 * Function to calculate the BlockView position of a dropped node.
 * @param getViewport
 * @param event
 * @returns a Position object.
 */
function SetBlockNodePosition(getViewport: GetViewport, event: React.DragEvent<HTMLDivElement>) {
  const defaultMarginX = 45;
  const defaultMarginY = 43;

  let x = event.clientX - defaultMarginX - getViewport().x;
  let y = event.clientY - defaultMarginY - getViewport().y;

  if (getViewport().zoom < Size.ZOOM_DEFAULT) {
    const absX = Math.abs(getViewport().x - event.clientX);
    const absY = Math.abs(getViewport().y - event.clientY);
    x = event.clientX + absX;
    y = event.clientY + absY;
  }

  return { x, y } as Position;
}

/**
 * Function to define the dropzone for a SecondaryNode.
 * A node will have the SecondaryNode as parent if dropped over its area.
 * @param getViewport
 * @returns an X value where the SecondaryNode is placed.
 */
function CalculateSecondaryNodeDropZone(getViewport: GetViewport, primaryNode: Node) {
  const zoom = getViewport().zoom;
  const x = getViewport().x;

  const parentNodeWidthScaled = primaryNode.width * zoom;
  return x + parentNodeWidthScaled + Size.SPLITVIEW_DISTANCE;
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
function FindParent(targetNode: NodeLibCm, selectedNode: Node, secondaryNode: Node, dropZone: number, clientX: number) {
  if (!IsFamily(targetNode, selectedNode) && !IsFamily(targetNode, secondaryNode)) return null;
  if (!IsFamily(targetNode, selectedNode)) return secondaryNode;
  if (!IsFamily(targetNode, secondaryNode)) return selectedNode;
  return clientX < dropZone ? selectedNode : secondaryNode;
}

export default useOnDrop;
