import { addNode, createEdge, setActiveNode } from "../../../redux/store/project/actions";
import { GetEdgeType } from "../tree/helpers";
import { ConvertNodeToFlow, ConvertToEdge, ConvertToNode } from "../converters";
import { BuildTreeEdge } from "../tree/builders";
import { BlobData, LibItem, Project, User, Node, LibrarySubProjectItem } from "../../../models";
import { LibraryState } from "../../../redux/store/library/types";
import { BuildBlockNode } from "../block/builders";
import { Size } from "../../../compLibrary";
import { GetSelectedNode, IsBlockView, IsFamily } from "../../../helpers";
import {
  CreateId,
  GetProjectData,
  GetSubProject,
  IsInputTerminal,
  IsPartOf,
  IsSubProject,
  SetSiblingIndexOnNodeDrop,
} from "./../helpers";

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
  parentNode: Node,
  animatedEdge: boolean
) => {
  const sourceNode = GetSelectedNode();
  const isSubProject = IsSubProject(event);

  if (isSubProject && !IsBlockView()) {
    event.stopPropagation();
    event.preventDefault();
    const eventData = JSON.parse(event.dataTransfer.getData("application/reactflow")) as LibrarySubProjectItem;

    (async () => {
      const subProject = await GetSubProject(eventData.id);
      const data = await GetProjectData(event, project, subProject);

      data[0].forEach((node) => {
        dispatch(addNode(node));
        setElements((es) => es.concat(ConvertNodeToFlow(node)));
      });

      data[1].forEach((edge) => {
        dispatch(createEdge(edge));
        const edgeType = GetEdgeType(edge.fromConnector);
        setElements((es) => es.concat(BuildTreeEdge(edge, edgeType, project.nodes, animatedEdge)));
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
      : setElements((es) => es.concat(ConvertNodeToFlow(targetNode)));

    if (sourceNode && IsFamily(sourceNode, targetNode)) {
      targetNode.level = sourceNode.level + 1;
      const sourceConn = sourceNode.connectors?.find((x) => IsPartOf(x) && !IsInputTerminal(x));
      const targetConn = targetNode.connectors?.find((x) => IsPartOf(x) && IsInputTerminal(x));
      const partofEdge = ConvertToEdge(CreateId(), sourceConn, targetConn, sourceNode, targetNode, project.id, library, false);

      SetSiblingIndexOnNodeDrop(targetNode, project, sourceNode);
      dispatch(createEdge(partofEdge));

      const edgeType = GetEdgeType(sourceConn);
      setElements((es) => es.concat(BuildTreeEdge(partofEdge, edgeType, project.nodes, animatedEdge)));
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
