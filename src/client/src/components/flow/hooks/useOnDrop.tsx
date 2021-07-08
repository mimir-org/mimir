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
  isFile: boolean,
  project: Project,
  event,
  dispatch,
  setElements,
  reactFlowInstance,
  reactFlowWrapper,
  masterProjectId: string,
  icons: BlobData[],
  splitView?: boolean,
  selectedNode?: Node
) => {
  const showBlockView = IsBlockView();

  if (isFile && !showBlockView) {
    event.stopPropagation();
    event.preventDefault();

    (async () => {
      const data = await GetFileData(event, project);

      data[0].forEach((node) => {
        // dispatch(addNode(node));
        // setElements((es) => es.concat(CreateTreeNode(node)));
      });

      data[1].forEach((edge) => {
        // dispatch(createEdge(edge));
        // const edgeType = GetTreeEdgeType(edge.fromConnector);
        // setElements((es) => es.concat(CreateTreeEdge(edge, edgeType)));
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
      masterProjectId: masterProjectId,
      symbolId: data.symbolId,
      symbol: icons?.find((x) => x.id === data.symbolId),
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

    node.level = 0;

    showBlockView
      ? setElements((es) => es.concat(CreateBlockNode(node, null, splitView)))
      : setElements((es) => es.concat(CreateTreeNode(node)));

    if (selectedNode) {
      if (selectedNode.aspect !== node.aspect) return;

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
        masterProjectId: masterProjectId,
      } as Edge;

      let parentNodeLevel = selectedNode.level;
      node.level = ++parentNodeLevel;

      dispatch(createEdge(partofEdge));

      const edgeType = GetTreeEdgeType(fromConnector);
      setElements((es) => es.concat(CreateTreeEdge(partofEdge, edgeType)));
    }
    dispatch(addNode(node));
  }
};

export default useOnDrop;
