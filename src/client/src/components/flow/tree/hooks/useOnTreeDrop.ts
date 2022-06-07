import { ReactFlowInstance } from "react-flow-renderer";
import { addNode, createEdge } from "../../../../redux/store/project/actions";
import { ConvertLibNodeToNode } from "../../converters";
import { LibraryState } from "../../../../redux/store/library/types";
import { Dispatch } from "redux";
import { LibrarySubProjectItem, Node, Project, User } from "../../../../models";
import { HandleCreatePartOfEdge, SetTreeNodePosition } from "../../helpers/LibraryDrop";
import { GetProjectData, GetSubProject, IsSubProject } from "../helpers";
import { IsFamily } from "../../../../helpers/Family";
import { NodeLibCm } from "@mimirorg/typelibrary-types";

export const DATA_TRANSFER_APPDATA_TYPE = "application/reactflow";

interface OnDropParameters {
  event: React.DragEvent<HTMLDivElement>;
  project: Project;
  user: User;
  library: LibraryState;
  flowInstance: ReactFlowInstance;
  flowWrapper: React.MutableRefObject<HTMLDivElement>;
  dispatch: Dispatch;
}

/**
 * Hook that runs when a Node from the LibraryModule is dropped onto the Mimir canvas in TreeView.
 * A partOf Edge is created from the dropped Node to its parent.
 * The parent is the Node that is selected on the canvas, or the AspectNode (root node) if none are selected.
 * @param params
 */
const useOnTreeDrop = (params: OnDropParameters) => {
  const { event, project, dispatch } = params;

  event.stopPropagation();
  event.preventDefault();

  if (DoesNotContainApplicationData(event)) return;

  const isSubProject = IsSubProject(event);

  if (isSubProject) HandleSubProjectDrop(event, project, dispatch);
  else HandleNodeDrop(params);
};

const DoesNotContainApplicationData = (event: React.DragEvent<HTMLDivElement>) =>
  !event.dataTransfer.types.includes(DATA_TRANSFER_APPDATA_TYPE);

/**
 * Function to handle a node dropped from the Library.
 * The dropped node is of the type NodeLibCm, and it is converted to a Node.
 * @param OnDropParameters
 */
function HandleNodeDrop({ event, project, user, library, dispatch }: OnDropParameters) {
  const libNode = JSON.parse(event.dataTransfer.getData(DATA_TRANSFER_APPDATA_TYPE)) as NodeLibCm;
  const selectedNode = project?.nodes?.find((n) => n.selected);

  // The dropped node automatically finds a parent
  const parentNode = SetParentNodeOnDrop(selectedNode, libNode, project.nodes);

  const treePosition = SetTreeNodePosition(parentNode, project.nodes, project.edges);
  const blockPosition = { x: parentNode.positionX, y: parentNode.positionY };

  const node = ConvertLibNodeToNode(libNode, parentNode, treePosition, blockPosition, project.id, user);

  if (IsFamily(parentNode, node)) HandleCreatePartOfEdge(parentNode, node, project, library, dispatch);

  dispatch(addNode(node));
}

/**
 * A dropped node automatically is assigned a parent.
 * If a node is selected and has the same Aspect as the dropped node, it becomes the parent.
 * If no node is selected, the root node with the same Aspect becomes the parent.
 * @param selectedNode
 * @param node
 * @param nodes
 * @returns a Node.
 */
function SetParentNodeOnDrop(selectedNode: Node, node: NodeLibCm, nodes: Node[]) {
  if (selectedNode && IsFamily(selectedNode, node)) return selectedNode;
  return nodes.find((n) => IsFamily(n, node));
}

export default useOnTreeDrop;

/**
 * Function to handle a SubProject dropped from the Library.
 * @param event
 * @param project
 * @param dispatch
 */
function HandleSubProjectDrop(event: React.DragEvent<HTMLDivElement>, project: Project, dispatch: Dispatch) {
  const eventData = JSON.parse(event.dataTransfer.getData(DATA_TRANSFER_APPDATA_TYPE)) as LibrarySubProjectItem;

  (async () => {
    const subProject = await GetSubProject(eventData.id);
    const [nodesToCreate, edgesToCreate] = GetProjectData(event, project, subProject);

    nodesToCreate.forEach((node) => dispatch(addNode(node)));
    edgesToCreate.forEach((edge) => dispatch(createEdge(edge)));
  })();
}
