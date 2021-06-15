import { addNode, createEdge } from "../../../redux/store/project/actions";
import { LibNode, Node, NodeType, Edge } from "../../../models/project";
import { CreateBlockNode, IsBlockView } from "../helpers/block";
import {
  CreateId,
  IsNodeSameType,
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
  ) as LibNode;

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
    semanticId: data.semanticReference,
    name: data.name,
    label: data.label ?? data.name,
    type: data.type as NodeType,
    positionX: position.x,
    positionY: position.y,
    positionBlockX: position.x,
    positionBlockY: position.y,
    connectors: data.connectors,
    attributes: data.attributes,
    icon: data.icon,
    version: "1.0",
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
    if (!IsNodeSameType(selectedNode, node)) return;

    const fromConnector = selectedNode.connectors?.find(
      (x) => IsPartOfTerminal(x) && !IsInputConnector(x)
    );
    const toConnector = node.connectors?.find(
      (x) => IsPartOfTerminal(x) && IsInputConnector(x)
    );

    const partofEdge = {
      id: CreateId(),
      fromConnector: fromConnector.id,
      toConnector: toConnector.id,
      fromNode: selectedNode.id,
      toNode: node.id,
      isHidden: false,
      parentType: selectedNode.type,
      targetType: node.type,
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
