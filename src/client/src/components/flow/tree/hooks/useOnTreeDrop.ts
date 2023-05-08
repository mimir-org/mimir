import { ReactFlowInstance } from "react-flow-renderer";
// import { addNode, mergeSubProject } from "../../../../redux/store/project/actions";
import { Dispatch } from "redux";
import { HandleCreatePartOfEdge, SetTreeNodePosition } from "../../helpers/LibraryDrop";
import { IsSubProject } from "../helpers";
import { IsFamily } from "../../../../helpers/Family";
import { AspectObjectLibCm, TerminalLibCm } from "@mimirorg/typelibrary-types";
import { AspectObject, Position, Project, User } from "lib";

export const DATA_TRANSFER_APPDATA_TYPE = "application/reactflow";

interface OnDropParameters {
  event: React.DragEvent<HTMLDivElement>;
  project: Project;
  terminals: TerminalLibCm[];
  user: User;
  flowInstance: ReactFlowInstance;
  flowWrapper: React.MutableRefObject<HTMLDivElement>;
  dispatch: Dispatch;
}

interface VersionData {
  id: string;
  version: string;
}

/**
 * Hook that runs when a LibNode from the LibraryModule is dropped onto the Mimir canvas in TreeView.
 * The LibNode is converted to a Mimir Node, and a partOf Edge is created from the dropped Node to its parent.
 * The parent is the Node that is selected on the canvas (selectedNode), or the AspectNode (root node) if none are selected.
 * @param params
 */
const useOnTreeDrop = (params: OnDropParameters) => {
  const { event, project, dispatch } = params;

  event.stopPropagation();
  event.preventDefault();

  if (DoesNotContainApplicationData(event)) return;

  IsSubProject(event) ? HandleSubProjectDrop(event, project, params, dispatch) : HandleLibNodeDrop(params);
};

const DoesNotContainApplicationData = (event: React.DragEvent<HTMLDivElement>) =>
  !event.dataTransfer.types.includes(DATA_TRANSFER_APPDATA_TYPE);

/**
 * Function to handle a LibNode dropped from the Library.
 * The dropped node is of the type NodeLibCm, and it is converted to a Node.
 * @param OnDropParameters
 */
function HandleLibNodeDrop({ event, project, terminals, user, dispatch }: OnDropParameters) {
  const libNode = JSON.parse(event.dataTransfer.getData(DATA_TRANSFER_APPDATA_TYPE)) as AspectObjectLibCm;
  const selectedNode = project?.aspectObjects?.find((n) => n.selected);

  // The dropped node automatically finds a parent
  const parentNode = SetParentNodeOnDrop(selectedNode, libNode, project.aspectObjects);

  // Position for both treeView and blockView must be set
  const treePosition = SetTreeNodePosition(parentNode, project);
  const blockPosition = new Position(parentNode.positionBlock.posX, parentNode.positionBlock.posY);

  const aspectObject = new AspectObject(libNode, project.id, treePosition, blockPosition, user.email);

  // const convertedNode = ConvertLibNodeToNode(libNode, parentNode, treePosition, blockPosition, project.id, user, terminals);
  if (IsFamily(parentNode, aspectObject)) HandleCreatePartOfEdge(parentNode, aspectObject, project, dispatch);

  // TODO: Resolve this
  // dispatch(addNode(convertedNode));
}

/**
 * A dropped node is automatically assigned a parent.
 * If a node is selected and has the same Aspect as the dropped node, it becomes the parent.
 * If no node is selected, the root node with the same Aspect becomes the parent.
 * @param selectedNode
 * @param node
 * @param nodes
 * @returns a Node.
 */
function SetParentNodeOnDrop(selectedNode: AspectObject, node: AspectObjectLibCm, nodes: AspectObject[]) {
  return IsFamily(selectedNode, node) ? selectedNode : nodes.find((n) => IsFamily(n, node));
}

/**
 * Function to handle a SubProject dropped from the Library.
 * Note: The functionality for SubProject is not yet fully implemented in Mimir.
 * @param event
 * @param project
 * @param dispatch
 */
function HandleSubProjectDrop(
  event: React.DragEvent<HTMLDivElement>,
  project: Project,
  params: OnDropParameters,
  dispatch: Dispatch
) {
  const eventData = JSON.parse(event.dataTransfer.getData(DATA_TRANSFER_APPDATA_TYPE)) as VersionData;
  const reactFlowBounds = params.flowWrapper.current.getBoundingClientRect();

  const position = params.flowInstance.project({
    x: event.clientX - reactFlowBounds.left,
    y: event.clientY - reactFlowBounds.top,
  });

  // TODO: Resolve this

  // const prepare: PrepareAm = {
  //   subProjectId: eventData.id,
  //   projectId: project.id,
  //   dropPositionX: position.x,
  //   dropPositionY: position.y,
  //   version: eventData.version,
  // };

  // dispatch(mergeSubProject(prepare));
}

export default useOnTreeDrop;
