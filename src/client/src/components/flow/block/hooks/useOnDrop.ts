import { Dispatch } from "redux";
import { Size } from "../../../../compLibrary/size/Size";
import { addNode } from "../../../../redux/store/project/actions";
import { ConvertToNode } from "../../converters";
import { LibraryState } from "../../../../redux/store/library/types";
import { GetSelectedNode, IsFamily } from "../../../../helpers";
import { Elements, FlowTransform, OnLoadParams } from "react-flow-renderer";
import { BlobData, LibItem, Node, Project, User } from "../../../../models";
import { HandleCreatePartOfEdge, InitConnectorVisibility } from "../../helpers/LibraryDropHelpers";

export const DATA_TRANSFER_APPDATA_TYPE = "application/reactflow";

interface OnDropParameters {
  event: React.DragEvent<HTMLDivElement>;
  project: Project;
  user: User;
  icons: BlobData[];
  library: LibraryState;
  secondaryNode: Node;
  flowTransform: FlowTransform;
  reactFlowInstance: OnLoadParams;
  reactFlowWrapper: React.MutableRefObject<HTMLDivElement>;
  setElements: React.Dispatch<React.SetStateAction<Elements>>;
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

function HandleNodeDrop({ event, project, user, icons, library, secondaryNode, flowTransform, dispatch }: OnDropParameters) {
  const data = JSON.parse(event.dataTransfer.getData(DATA_TRANSFER_APPDATA_TYPE)) as LibItem;
  let parentNode = GetSelectedNode();

  const position = { x: event.clientX, y: event.clientY };
  const targetNode = ConvertToNode(data, position, project.id, icons, user);

  if (!secondaryNode && !IsFamily(parentNode, targetNode)) return;

  // Handle drop in SplitView
  if (secondaryNode) {
    const dropZone = CalculateSecondaryNodeDropZone(flowTransform);
    parentNode = FindParent(targetNode, parentNode, secondaryNode, dropZone, event.clientX);
    if (!parentNode) return;
  }

  targetNode.connectors?.forEach((connector) => InitConnectorVisibility(connector, targetNode));
  if (IsFamily(parentNode, targetNode)) HandleCreatePartOfEdge(parentNode, targetNode, project, library, dispatch);

  dispatch(addNode(targetNode));
}

/**
 * Function to define the dropzone for a SecondaryNode.
 * A Node will have the SecondaryNode as parent if dropped over its area.
 * @param transform
 * @returns an X position where the SecondaryNode is placed.
 */
function CalculateSecondaryNodeDropZone(transform: FlowTransform) {
  const parentNodeWidthScaled = Size.BLOCK_NODE_WIDTH * transform.zoom;
  return transform.x + Size.SPLITVIEW_DISTANCE + parentNodeWidthScaled;
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
function FindParent(targetNode: Node, selectedNode: Node, secondaryNode: Node, dropZone: number, clientX: number) {
  if (!IsFamily(targetNode, selectedNode) && !IsFamily(targetNode, secondaryNode)) return null;
  if (!IsFamily(targetNode, selectedNode)) return secondaryNode;
  if (!IsFamily(targetNode, secondaryNode)) return selectedNode;
  return clientX < dropZone ? selectedNode : secondaryNode;
}

export default useOnDrop;
