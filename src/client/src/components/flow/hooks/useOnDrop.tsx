import { addNode, createEdge, setActiveNode } from "../../../redux/store/project/actions";
import { IsBlockView } from "../block/helpers";
import { GetEdgeType } from "../tree/helpers";
import { ConvertToEdge, ConvertToNode } from "../converters";
import { BuildTreeEdge, BuildTreeNode } from "../tree/builders";
import {
  BlobData,
  LibItem,
  Project,
  User,
  Node,
  LibrarySubProjectItem,
  Edge,
  RelationType,
  ConnectorType,
} from "../../../models";
import { LibraryState } from "../../../redux/store/library/types";
import { BuildBlockNode } from "../block/builders";
import { Size } from "../../../compLibrary";
import {
  CreateId,
  GetSelectedNode,
  IsAspectNode,
  IsFamily,
  IsInputTerminal,
  IsOutputTerminal,
  IsPartOf,
  IsSubProject,
  SetSiblingIndexOnNodeDrop,
} from "./../helpers";
import { get } from "../../../models/webclient/WebClient";
import { InitializeProject } from "../../../redux/sagas/project";

const GetProject = async (projectId: string): Promise<Project> => {
  try {
    const url = process.env.REACT_APP_API_BASE_URL + "subproject/" + projectId;
    const response = await get(url);
    if (response.ok) {
      return InitializeProject(response.data as Project);
    }
    return null;
  } catch (error) {
    console.log(error);
  }
};

const GetProjectData = async (event: any, project: Project, subProject: Project): Promise<[Node[], Edge[]]> => {
  try {
    if (!subProject?.isSubProject) return [[], []];

    let targetNodeId = event.target?.attributes["data-id"]?.value;

    if (!targetNodeId) {
      targetNodeId = event.target?.offsetParent?.attributes["data-id"]?.value;
    }

    if (!targetNodeId) return [[], []];

    const targetNode = project.nodes.find((x) => x.id === targetNodeId);
    if (!targetNode) return [[], []];

    const targetnodeConnector = targetNode.connectors.find(
      (x) => x.relationType === RelationType.PartOf && x.type === ConnectorType.Output
    );

    if (!targetnodeConnector) return [[], []];

    // Add data to current project
    // Find the rootnode for current location
    const rootNode = subProject.nodes.find((x) => x.isRoot && IsFamily(x, targetNode));

    // Find the connector that should do a remap
    const rootNodeConnector = rootNode.connectors.find(
      (x) => x.relationType === RelationType.PartOf && x.type === ConnectorType.Output
    );

    // Find edges that should change parent
    const edges = subProject.edges.filter((x) => x.fromConnectorId === rootNodeConnector.id);

    // Remap edges
    edges.forEach((edge) => {
      edge.id = CreateId();
      edge.fromConnectorId = targetnodeConnector.id;
      edge.fromNodeId = targetNode.id;
      edge.fromConnector = targetnodeConnector;
      edge.fromNode = targetNode;
      edge.masterProjectId = project.id;
    });

    const nodesToCreate = subProject.nodes.filter(
      (x) => !x.isRoot && IsFamily(x, targetNode) && !project.nodes.find((y) => y.id === x.id)
    );

    const edgesToCreate = subProject.edges.filter(
      (x) => IsFamily(x.fromNode, targetNode) && !IsAspectNode(x.fromNode) && !project.edges.find((y) => y.id === x.id)
    );

    nodesToCreate.forEach((node) => {
      node.positionY = node.positionY + targetNode.positionY;
    });

    return [nodesToCreate, edgesToCreate];
  } catch (error) {
    console.log(error);
  }
};

const useOnDrop = (
  project: Project,
  event: any,
  dispatch: any,
  setElements: any,
  reactFlowInstance: any,
  reactFlowWrapper: any,
  icons: BlobData[],
  library: LibraryState,
  user: User,
  parentNode: Node
) => {
  const sourceNode = GetSelectedNode();
  // const isFile = event.dataTransfer.files && event.dataTransfer.files.length > 0;
  const isSubProject = IsSubProject(event);

  if (isSubProject && !IsBlockView()) {
    event.stopPropagation();
    event.preventDefault();
    const eventData = JSON.parse(event.dataTransfer.getData("application/reactflow")) as LibrarySubProjectItem;

    (async () => {
      const subProject = await GetProject(eventData.id);
      const data = await GetProjectData(event, project, subProject);

      data[0].forEach((node) => {
        dispatch(addNode(node));
        setElements((es) => es.concat(BuildTreeNode(node)));
      });

      data[1].forEach((edge) => {
        dispatch(createEdge(edge));
        const edgeType = GetEdgeType(edge.fromConnector);
        setElements((es) => es.concat(BuildTreeEdge(edge, edgeType, project.nodes)));
      });
    })();
  } else if (!isSubProject) {
    event.preventDefault();
    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const data = JSON.parse(event.dataTransfer.getData("application/reactflow")) as LibItem;
    let position;

    if (!reactFlowInstance) position = { x: event.clientX, y: event.clientY };
    else
      position = reactFlowInstance?.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

    const targetNode = ConvertToNode(data, position, project.id, icons, user);

    targetNode.composites?.forEach((c) => {
      var compositeId = CreateId();
      c.id = compositeId;
      c.nodeId = targetNode.id;
      c.attributes.forEach((a) => {
        a.compositeId = compositeId;
      });
    });

    targetNode.connectors?.forEach((c) => {
      c.id = CreateId();
      c.nodeId = targetNode.id;
      c.attributes?.forEach((a) => {
        a.id = CreateId();
      });
    });

    targetNode.attributes?.forEach((a) => {
      a.nodeId = targetNode.id;
      a.id = CreateId();
    });

    IsBlockView()
      ? setElements((es) =>
          es.concat(BuildBlockNode(targetNode, parentNode, { width: Size.Node_Width, length: Size.Node_Length }))
        )
      : setElements((es) => es.concat(BuildTreeNode(targetNode)));

    if (sourceNode && IsFamily(sourceNode, targetNode)) {
      targetNode.level = sourceNode.level + 1;
      const sourceConn = sourceNode.connectors?.find((x) => IsPartOf(x) && IsOutputTerminal(x));
      const targetConn = targetNode.connectors?.find((x) => IsPartOf(x) && IsInputTerminal(x));
      const partofEdge = ConvertToEdge(CreateId(), sourceConn, targetConn, sourceNode, targetNode, project.id, library, false);

      SetSiblingIndexOnNodeDrop(targetNode, project, sourceNode);
      dispatch(createEdge(partofEdge));

      const edgeType = GetEdgeType(sourceConn);
      setElements((es) => es.concat(BuildTreeEdge(partofEdge, edgeType, project.nodes)));
    }

    dispatch(addNode(targetNode));
    if (!IsBlockView()) dispatch(setActiveNode(targetNode.id, true));
  } else {
    event.stopPropagation();
    event.preventDefault();
    return;
  }
};

export default useOnDrop;
