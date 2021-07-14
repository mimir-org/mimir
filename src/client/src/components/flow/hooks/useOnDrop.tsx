import { addNode, createEdge } from "../../../redux/store/project/actions";
import { CreateBlockNode, IsBlockView } from "../helpers/block";
import {
  BlobData,
  Edge,
  LibraryNodeItem,
  Node,
  Project,
  GetFileData,
} from "../../../models";
import {
  CreateId,
  FindSelectedNode,
  IsInputTerminal,
  IsOutputTerminal,
  IsPartOfTerminal,
} from "./../helpers/common";
import {
  CreateTreeNode,
  GetTreeEdgeType,
  CreateTreeEdge,
} from "../helpers/tree";

const useOnDrop = (
  project: Project,
  event,
  dispatch,
  setElements,
  reactFlowInstance,
  reactFlowWrapper,
  icons: BlobData[]
) => {
  const showBlockView = IsBlockView();
  const selectedNode = FindSelectedNode();
  const isFile =
    event.dataTransfer.files && event.dataTransfer.files.length > 0;

  if (isFile && !showBlockView) {
    event.stopPropagation();
    event.preventDefault();

    (async () => {
      const data = await GetFileData(event, project);

      data[0].forEach((node) => {
        dispatch(addNode(node));
        setElements((es) => es.concat(CreateTreeNode(node)));
      });

      data[1].forEach((edge) => {
        dispatch(createEdge(edge));
        const edgeType = GetTreeEdgeType(edge.fromConnector);
        setElements((es) =>
          es.concat(CreateTreeEdge(edge, edgeType, project.nodes))
        );
      });
    })();
  } else {
    event.preventDefault();
    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const data = JSON.parse(
      event.dataTransfer.getData("application/reactflow")
    ) as LibraryNodeItem;

    let position;

    if (!reactFlowInstance) position = { x: event.clientX, y: event.clientY };
    else
      position = reactFlowInstance?.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

    const node = {
      id: CreateId(),
      rds: data.rds,
      semanticReference: data.semanticReference,
      name: data.name,
      label: data.name,
      positionX: position.x,
      positionY: position.y,
      positionBlockX: position.x,
      positionBlockY: position.y,
      connectors: data.connectors,
      attributes: data.attributes,
      aspect: data.aspect,
      statusId: data.statusId,
      version: data.version,
      masterProjectId: project.id,
      symbolId: data.symbolId,
      symbol: icons?.find((x) => x.id === data.symbolId),
      level: 0,
    } as Node;

    node.connectors?.forEach((c) => {
      c.id = CreateId();
      c.nodeId = node.id;
      c.attributes?.forEach((a) => {
        a.id = CreateId();
      });
    });

    node.attributes?.forEach((a) => {
      a.nodeId = node.id;
      a.id = CreateId();
    });

    showBlockView
      ? setElements((es) => es.concat(CreateBlockNode(node, null)))
      : setElements((es) => es.concat(CreateTreeNode(node)));

    if (selectedNode && selectedNode.aspect === node.aspect) {
      node.level = selectedNode.level + 1;

      const fromConnector = selectedNode.connectors?.find(
        (x) => IsPartOfTerminal(x) && IsOutputTerminal(x)
      );
      const toConnector = node.connectors?.find(
        (x) => IsPartOfTerminal(x) && IsInputTerminal(x)
      );

      const partofEdge = {
        id: CreateId(),
        fromConnectorId: fromConnector.id,
        fromConnector: fromConnector,
        toConnectorId: toConnector.id,
        toConnector: toConnector,
        fromNodeId: selectedNode.id,
        fromNode: selectedNode,
        toNodeId: node.id,
        toNode: node,
        isHidden: false,
        masterProjectId: project.id,
      } as Edge;

      dispatch(createEdge(partofEdge));

      const edgeType = GetTreeEdgeType(fromConnector);
      setElements((es) =>
        es.concat(CreateTreeEdge(partofEdge, edgeType, project.nodes))
      );
    }
    dispatch(addNode(node));
  }
};

export default useOnDrop;
