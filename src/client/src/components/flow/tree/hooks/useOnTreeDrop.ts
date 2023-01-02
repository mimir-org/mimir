import { ReactFlowInstance } from "react-flow-renderer";
import { addNode, createEdge, mergeSubProject } from "../../../../redux/store/project/actions";
import { ConvertLibNodeToNode } from "../../converters";
import { Dispatch } from "redux";
import { User } from "../../../../models";
import { HandleCreatePartOfEdge, SetTreeNodePosition } from "../../helpers/LibraryDrop";
import { GetProjectData, IsSubProject } from "../helpers";
import { IsFamily } from "../../../../helpers/Family";
import { NodeLibCm, TerminalLibCm } from "@mimirorg/typelibrary-types";
import { Node, PrepareAm, Project } from "@mimirorg/modelbuilder-types";

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

  IsSubProject(event) ? HandleSubProjectDrop(event, project, dispatch) : HandleLibNodeDrop(params);
};

const DoesNotContainApplicationData = (event: React.DragEvent<HTMLDivElement>) =>
  !event.dataTransfer.types.includes(DATA_TRANSFER_APPDATA_TYPE);

/**
 * Function to handle a LibNode dropped from the Library.
 * The dropped node is of the type NodeLibCm, and it is converted to a Node.
 * @param OnDropParameters
 */
function HandleLibNodeDrop({ event, project, terminals, user, dispatch }: OnDropParameters) {
  const libNode = JSON.parse(event.dataTransfer.getData(DATA_TRANSFER_APPDATA_TYPE)) as NodeLibCm;
  const selectedNode = project?.nodes?.find((n) => n.selected);

  // The dropped node automatically finds a parent
  const parentNode = SetParentNodeOnDrop(selectedNode, libNode, project.nodes);

  // Position for both treeView and blockView must be set
  const treePosition = SetTreeNodePosition(parentNode, project.nodes, project.edges);
  const blockPosition = { x: parentNode.positionX, y: parentNode.positionY };

  const convertedNode = ConvertLibNodeToNode(libNode, parentNode, treePosition, blockPosition, project.id, user, terminals);
  if (IsFamily(parentNode, convertedNode)) HandleCreatePartOfEdge(parentNode, convertedNode, project, dispatch);

  dispatch(addNode(convertedNode));
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
function SetParentNodeOnDrop(selectedNode: Node, node: NodeLibCm, nodes: Node[]) {
  return IsFamily(selectedNode, node) ? selectedNode : nodes.find((n) => IsFamily(n, node));
}

/**
 * Function to handle a SubProject dropped from the Library.
 * Note: The functionality for SubProject is not yet fully implemented in Mimir.
 * @param event
 * @param project
 * @param dispatch
 */
function HandleSubProjectDrop(event: React.DragEvent<HTMLDivElement>, project: Project, dispatch: Dispatch) {
  const eventData = JSON.parse(event.dataTransfer.getData(DATA_TRANSFER_APPDATA_TYPE)) as Project;

  const prepare: PrepareAm = {
    subProjectId: eventData.id,
    projectId: project.id,
    dropPositionX: event.clientX.toString(),
    dropPositionY: event.clientY.toString(),
  };

  dispatch(mergeSubProject(prepare));
  // const [nodesToCreate, edgesToCreate] = GetProjectData(event, project, eventData);
  // nodesToCreate.forEach((node) => dispatch(addNode(node)));
  // edgesToCreate.forEach((edge) => dispatch(createEdge(edge)));

  // (async () => {
  //   const subProject = await GetSubProject(eventData.project.id);
  //   const [nodesToCreate, edgesToCreate] = GetProjectData(event, project, subProject);

  // })();
}

export default useOnTreeDrop;
