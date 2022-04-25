import { ReactFlowInstance } from "react-flow-renderer";
import { addNode, createEdge } from "../../../../redux/store/project/actions";
import { ConvertDataToNode } from "../../converters";
import { LibraryState } from "../../../../redux/store/library/types";
import { Dispatch } from "redux";
import { BlobData, LibItem, LibrarySubProjectItem, Node, Project, User } from "../../../../models";
import { HandleCreatePartOfEdge, InitConnectorVisibility, SetTreeNodePosition } from "../../helpers/LibraryDrop";
import { GetProjectData, GetSubProject, IsSubProject } from "../helpers";
import { IsFamily } from "../../../../helpers/Family";

export const DATA_TRANSFER_APPDATA_TYPE = "application/reactflow";

interface OnDropParameters {
  event: React.DragEvent<HTMLDivElement>;
  project: Project;
  selectedNode: Node;
  user: User;
  icons: BlobData[];
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
  const { event, project, selectedNode, dispatch } = params;

  event.stopPropagation();
  event.preventDefault();

  if (DoesNotContainApplicationData(event)) return;

  const isSubProject = IsSubProject(event);

  if (isSubProject) HandleSubProjectDrop(event, project, dispatch);
  else HandleNodeDrop(params, selectedNode);
};

const DoesNotContainApplicationData = (event: React.DragEvent<HTMLDivElement>) =>
  !event.dataTransfer.types.includes(DATA_TRANSFER_APPDATA_TYPE);

function HandleSubProjectDrop(event: React.DragEvent<HTMLDivElement>, project: Project, dispatch: Dispatch) {
  const eventData = JSON.parse(event.dataTransfer.getData(DATA_TRANSFER_APPDATA_TYPE)) as LibrarySubProjectItem;

  (async () => {
    const subProject = await GetSubProject(eventData.id);
    const [nodesToCreate, edgesToCreate] = GetProjectData(event, project, subProject);

    nodesToCreate.forEach((node) => dispatch(addNode(node)));
    edgesToCreate.forEach((edge) => dispatch(createEdge(edge)));
  })();
}

function HandleNodeDrop({ event, project, user, icons, library, dispatch }: OnDropParameters, selectedNode: Node) {
  const data = JSON.parse(event.dataTransfer.getData(DATA_TRANSFER_APPDATA_TYPE)) as LibItem;

  // The dropped node automatically finds a parent
  const parentNode = SetParentNodeOnDrop(selectedNode, data, project.nodes);

  const treePosition = SetTreeNodePosition(parentNode, project);
  const blockPosition = { x: parentNode.positionX, y: parentNode.positionY };

  const targetNode = ConvertDataToNode(data, treePosition, blockPosition, project.id, icons, user);
  if (!targetNode) return;

  targetNode.connectors?.forEach((connector) => (connector.connectorVisibility = InitConnectorVisibility(connector, targetNode)));
  if (IsFamily(parentNode, targetNode)) HandleCreatePartOfEdge(parentNode, targetNode, project, library, dispatch);

  dispatch(addNode(targetNode));
}

/**
 * A dropped node automatically is assigned a parent.
 * If a node is selected and has the same Aspect as the dropped node, it becomes the parent.
 * If no node is selected, the root node with the same Aspect becomes the parent.
 * @param selectedNode
 * @param data
 * @param nodes
 * @returns a Node.
 */
function SetParentNodeOnDrop(selectedNode: Node, data: LibItem, nodes: Node[]) {
  if (selectedNode && IsFamily(selectedNode, data)) return selectedNode;
  return nodes.find((n) => IsFamily(n, data));
}

export default useOnTreeDrop;
