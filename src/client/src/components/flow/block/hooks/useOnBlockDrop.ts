import { GetViewport, ReactFlowInstance } from "react-flow-renderer";
import { Dispatch } from "redux";
import { addNode } from "../../../../redux/store/project/actions";
import { ConvertLibNodeToNode } from "../../converters";
import { User } from "../../../../models";
import { Project, Node } from "@mimirorg/modelbuilder-types";
import { HandleCreatePartOfEdge, InitConnectorVisibility, SetTreeNodePosition } from "../../helpers/LibraryDrop";
import { Size } from "../../../../assets/size/Size";
import { Position } from "../../../../models/project";
import { IsFamily } from "../../../../helpers/Family";
import { NodeLibCm, TerminalLibCm } from "@mimirorg/typelibrary-types";

export const DATA_TRANSFER_APPDATA_TYPE = "application/reactflow";

interface OnDropParameters {
  event: React.DragEvent<HTMLDivElement>;
  project: Project;
  user: User;
  selectedNode: Node;
  instance: ReactFlowInstance;
  getViewport: GetViewport;
  dispatch: Dispatch;
  terminals: TerminalLibCm[];
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
function HandleLibNodeDrop({ event, project, user, selectedNode, getViewport, dispatch, terminals }: OnDropParameters) {
  const nodeLib = JSON.parse(event.dataTransfer.getData(DATA_TRANSFER_APPDATA_TYPE)) as NodeLibCm;

  if (!selectedNode) return;

  // Position for both treeView and blockView must be set
  const treePosition = SetTreeNodePosition(selectedNode, project.nodes, project.edges);
  const blockPosition = SetBlockNodePosition(getViewport, event);

  const convertedNode = ConvertLibNodeToNode(nodeLib, selectedNode, treePosition, blockPosition, project.id, user, terminals);
  convertedNode.connectors?.forEach((c) => (c.connectorVisibility = InitConnectorVisibility(c, convertedNode)));

  if (IsFamily(selectedNode, convertedNode)) HandleCreatePartOfEdge(selectedNode, convertedNode, project, dispatch);
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

export default useOnBlockDrop;
