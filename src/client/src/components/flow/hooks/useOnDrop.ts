import { addNode, createEdge, setActiveNode } from "../../../redux/store/project/actions";
import { ConvertToEdge, ConvertToNode } from "../converters";
import { BlobData, LibItem, Project, User, Node, LibrarySubProjectItem, Composite, Connector, Attribute } from "../../../models";
import { LibraryState } from "../../../redux/store/library/types";
import { GetSelectedNode, IsAspectNode, IsBlockView, IsFamily } from "../../../helpers";
import { Dispatch } from "redux";
import { Elements, OnLoadParams } from "react-flow-renderer";
import {
  CreateId,
  GetProjectData,
  GetSubProject,
  IsInputTerminal,
  IsPartOf,
  IsSubProject,
  SetSiblingIndexOnNodeDrop,
} from "../helpers";
import { cooperateAddEdge, cooperateAddNode } from "../../../modules/cooperate";

export const DATA_TRANSFER_APPDATA_TYPE = "application/reactflow";

interface OnDropParameters {
  event: React.DragEvent<HTMLDivElement>;
  project: Project;
  user: User;
  icons: BlobData[];
  library: LibraryState;
  reactFlowInstance: OnLoadParams;
  reactFlowWrapper: React.MutableRefObject<HTMLDivElement>;
  setElements: React.Dispatch<React.SetStateAction<Elements>>;
  dispatch: Dispatch;
}

const useOnDrop = (params: OnDropParameters) => {
  const { event, project, dispatch } = params;

  event.stopPropagation();
  event.preventDefault();

  if (DoesNotContainApplicationData(event)) return;

  const sourceNode = GetSelectedNode();
  const isSubProject = IsSubProject(event);

  if (isSubProject && !IsBlockView()) handleSubProjectDrop(event, project, dispatch);
  else if (!isSubProject) handleNodeDrop(params, sourceNode);
};

const handleSubProjectDrop = (event: React.DragEvent<HTMLDivElement>, project: Project, dispatch: Dispatch) => {
  const eventData = JSON.parse(event.dataTransfer.getData(DATA_TRANSFER_APPDATA_TYPE)) as LibrarySubProjectItem;

  (async () => {
    const subProject = await GetSubProject(eventData.id);
    const [nodesToCreate, edgesToCreate] = GetProjectData(event, project, subProject);

    nodesToCreate.forEach((node) => dispatch(addNode(node)));
    edgesToCreate.forEach((edge) => dispatch(createEdge(edge)));
  })();
};

const handleNodeDrop = ({ event, project, user, icons, library, dispatch }: OnDropParameters, sourceNode: Node) => {
  const data = JSON.parse(event.dataTransfer.getData(DATA_TRANSFER_APPDATA_TYPE)) as LibItem;
  const parentNode = getParentNode(sourceNode, project, data);

  const position = { x: parentNode.positionX, y: parentNode.positionY + 200 }; // TODO: fix when implementing auto-position
  const targetNode = ConvertToNode(data, position, project.id, icons, user);

  targetNode.composites?.forEach((composite) => initComposite(composite, targetNode));
  targetNode.connectors?.forEach((connector) => initConnector(connector, targetNode));
  targetNode.attributes?.forEach((attribute) => initNodeAttributes(attribute, targetNode));
  if (IsFamily(parentNode, targetNode)) handleCreatePartOfEdge(parentNode, targetNode, project, library, dispatch);

  dispatch(addNode(targetNode));
  dispatch(cooperateAddNode(targetNode));
  if (!IsBlockView()) dispatch(setActiveNode(targetNode.id, true));
};

const handleCreatePartOfEdge = (
  sourceNode: Node,
  targetNode: Node,
  project: Project,
  library: LibraryState,
  dispatch: Dispatch
) => {
  targetNode.level = sourceNode.level + 1;
  const sourceConn = sourceNode.connectors?.find((x) => IsPartOf(x) && !IsInputTerminal(x));
  const targetConn = targetNode.connectors?.find((x) => IsPartOf(x) && IsInputTerminal(x));
  const partofEdge = ConvertToEdge(CreateId(), sourceConn, targetConn, sourceNode, targetNode, project.id, library, false);

  SetSiblingIndexOnNodeDrop(targetNode, project, sourceNode);
  dispatch(createEdge(partofEdge));
  dispatch(cooperateAddEdge(partofEdge));
};

const initComposite = (composite: Composite, targetNode: Node) => {
  var compositeId = CreateId();
  composite.id = compositeId;
  composite.nodeId = targetNode.id;
  composite.attributes.forEach((a) => {
    a.compositeId = compositeId;
  });
};

const initConnector = (connector: Connector, targetNode: Node) => {
  connector.id = CreateId();
  connector.nodeId = targetNode.id;
  connector.attributes?.forEach((a) => {
    a.id = CreateId();
  });
};

const initNodeAttributes = (attribute: Attribute, targetNode: Node) => {
  attribute.nodeId = targetNode.id;
  attribute.id = CreateId();
};

const DoesNotContainApplicationData = (event: React.DragEvent<HTMLDivElement>) =>
  !event.dataTransfer.types.includes(DATA_TRANSFER_APPDATA_TYPE);

const getParentNode = (sourceNode: Node, project: Project, data: any) => {
  if (sourceNode && IsFamily(sourceNode, data)) return sourceNode;
  return project?.nodes.find((n) => IsAspectNode(n) && IsFamily(n, data));
};

export default useOnDrop;
