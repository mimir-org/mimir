import { addNode, createEdge } from "../../../../redux/store/project/actions";
import { ConvertToNode } from "../../converters";
import { LibraryState } from "../../../../redux/store/library/types";
import { GetSelectedNode, IsAspectNode, IsFamily } from "../../../../helpers";
import { Dispatch } from "redux";
import { OnLoadParams } from "react-flow-renderer";
import { BlobData, LibItem, LibrarySubProjectItem, Node, Project, User } from "../../../../models";
import { HandleCreatePartOfEdge, InitConnectorVisibility, SetTreeNodePosition } from "../../helpers/LibraryDropHelpers";
import { GetProjectData, GetSubProject, IsSubProject } from "../../helpers";

export const DATA_TRANSFER_APPDATA_TYPE = "application/reactflow";

interface OnDropParameters {
  event: React.DragEvent<HTMLDivElement>;
  project: Project;
  user: User;
  icons: BlobData[];
  library: LibraryState;
  flowInstance: OnLoadParams;
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

  const sourceNode = GetSelectedNode();
  const isSubProject = IsSubProject(event);

  if (isSubProject) HandleSubProjectDrop(event, project, dispatch);
  else HandleNodeDrop(params, sourceNode);
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

function HandleNodeDrop({ event, project, user, icons, library, dispatch }: OnDropParameters, sourceNode: Node) {
  const data = JSON.parse(event.dataTransfer.getData(DATA_TRANSFER_APPDATA_TYPE)) as LibItem;
  const parentNode = GetParentNode(sourceNode, project, data);

  const treePosition = SetTreeNodePosition(parentNode, project);
  const blockPosition = { x: parentNode.positionX, y: parentNode.positionY };

  const targetNode = ConvertToNode(data, treePosition, blockPosition, project.id, icons, user);
  if (!targetNode) return;

  targetNode.connectors?.forEach((connector) => (connector.connectorVisibility = InitConnectorVisibility(connector, targetNode)));
  if (IsFamily(parentNode, targetNode)) HandleCreatePartOfEdge(parentNode, targetNode, project, library, dispatch);

  dispatch(addNode(targetNode));
}

function GetParentNode(sourceNode: Node, project: Project, data: LibItem) {
  if (sourceNode && IsFamily(sourceNode, data)) return sourceNode;
  return project?.nodes.find((n) => IsAspectNode(n) && IsFamily(n, data));
}

export default useOnTreeDrop;
