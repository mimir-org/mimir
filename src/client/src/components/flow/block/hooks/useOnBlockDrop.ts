import { GetViewport, ReactFlowInstance } from "react-flow-renderer";
import { Dispatch } from "redux";
import { addNode } from "../../../../redux/store/project/actions";
import { ConvertLibNodeToNode } from "../../converters";
import { LibraryState } from "../../../../redux/store/library/types";
import { User } from "../../../../models";
import { Project, Node } from "@mimirorg/modelbuilder-types";
import { HandleCreatePartOfEdge, InitConnectorVisibility, SetTreeNodePosition } from "../../helpers/LibraryDrop";
import { Size } from "../../../../assets/size/Size";
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
 * Hook that runs when a LibNode from the LibraryModule is dropped onto the Mimir canvas in BlockView.
 * The LibNode is converted to a Mimir Node, and a partOf Edge is created from the dropped Node to its parent.
 * The parent is the selectedNode (primaryNode) or the secondaryParentNode.
 * @param params
 */
const useOnBlockDrop = (params: OnDropParameters) => {
  const { event } = params;
  event.stopPropagation();
  event.preventDefault();

  if (DoesNotContainApplicationData(event)) return;
  HandleLibNodeDrop(params);
};

const DoesNotContainApplicationData = (event: React.DragEvent<HTMLDivElement>) =>
  !event.dataTransfer.types.includes(DATA_TRANSFER_APPDATA_TYPE);

/**
 * Function to handle a LibNode dropped from the Library.
 * The dropped node is of the type NodeLibCm, and it is converted to a Node.
 * @param params
 */
function HandleLibNodeDrop({ event, project, user, lib, selectedNode, secondaryNode, getViewport, dispatch }: OnDropParameters) {
  const nodeLib = JSON.parse(event.dataTransfer.getData(DATA_TRANSFER_APPDATA_TYPE)) as NodeLibCm;

  let parentNode = selectedNode;
  if (!parentNode) return;

  // Handle drop in SplitView
  if (secondaryNode) {
    const dropZone = CalculateSecondaryNodeDropZone(getViewport, parentNode);
    parentNode = FindParent(nodeLib, parentNode, secondaryNode, dropZone, event.clientX);
    if (!parentNode) return;
  }

  // Position for both treeView and blockView must be set
  const treePosition = SetTreeNodePosition(parentNode, project.nodes, project.edges);
  const blockPosition = SetBlockNodePosition(getViewport, event);

  const convertedNode = ConvertLibNodeToNode(nodeLib, parentNode, treePosition, blockPosition, project.id, user);
  convertedNode.connectors?.forEach((c) => (c.connectorVisibility = InitConnectorVisibility(c, convertedNode)));

  if (IsFamily(parentNode, convertedNode)) HandleCreatePartOfEdge(parentNode, convertedNode, project, lib, dispatch);
  dispatch(addNode(convertedNode));
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
 * Function to determine which parentNode in SplitView that will be the parent of a dropped Node.
 * The parentNode is chosen based on if it is dropped over the primaryNode or the secondaryNode.
 * @param targetNode
 * @param primaryNode
 * @param secondaryNode
 * @param dropZone
 * @param clientX
 * @returns a parentNode.
 */
function FindParent(targetNode: NodeLibCm, primaryNode: Node, secondaryNode: Node, dropZone: number, clientX: number) {
  if (!IsFamily(targetNode, primaryNode) && !IsFamily(targetNode, secondaryNode)) return null;
  if (!IsFamily(targetNode, primaryNode)) return secondaryNode;
  if (!IsFamily(targetNode, secondaryNode)) return primaryNode;
  return clientX < dropZone ? primaryNode : secondaryNode;
}

export default useOnBlockDrop;
