import { addNode, createEdge } from "../../../redux/store/project/actions";
import { CreateBlockNode, IsBlockView } from "../helpers/block";
import { Edge, LibraryNodeItem, Node } from "../../../models";
import {
  CreateId,
  IsInputConnector,
  IsPartOfTerminal,
} from "./../helpers/common";
import {
  CreateTreeNode,
  GetTreeEdgeType,
  CreateTreeEdge,
} from "../helpers/tree";

const useOnDrop = (
  event,
  dispatch,
  setElements,
  reactFlowInstance,
  reactFlowWrapper,
  splitView?: boolean,
  selectedNode?: Node
) => {
  const showBlockView = IsBlockView();
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
  } as Node;

  node.connectors?.forEach((c) => {
    c.id = CreateId();
    c.nodeId = node.id;
  });

  node.attributes?.forEach((a) => {
    a.nodeId = node.id;
  });

  node.level = 0;

  showBlockView
    ? setElements((es) => es.concat(CreateBlockNode(node, splitView, null))) // TODO: fix
    : setElements((es) => es.concat(CreateTreeNode(node)));

  if (selectedNode) {
    if (selectedNode.aspect !== node.aspect) return;

    const fromConnector = selectedNode.connectors?.find(
      (x) => IsPartOfTerminal(x) && !IsInputConnector(x)
    );
    const toConnector = node.connectors?.find(
      (x) => IsPartOfTerminal(x) && IsInputConnector(x)
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
    } as Edge;

    let parentNodeLevel = selectedNode.level;
    node.level = ++parentNodeLevel;

    dispatch(createEdge(partofEdge));

    const edgeType = GetTreeEdgeType(fromConnector);
    setElements((es) => es.concat(CreateTreeEdge(partofEdge, edgeType)));
  }
  dispatch(addNode(node));
};

export default useOnDrop;
