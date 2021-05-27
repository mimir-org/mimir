import { addNode, createEdge } from "../../../redux/store/project/actions";
import { CreateId } from "./../helpers";
import { CheckView } from "../../../redux/store/localStorage/localStorage";
import { CreateBlockNode } from "../helpers/block";
import {
  CreateTreeNode,
  GetTreeEdgeType,
  CreateTreeEdge,
  ValidateSameNodeType,
} from "../helpers/tree";
import {
  CONNECTOR_TYPE,
  LibNode,
  Node,
  NodeType,
  RELATION_TYPE,
  VIEW_TYPE,
  Edge,
} from "../../../models/project";

const useOnDrop = (
  event,
  dispatch,
  setElements,
  reactFlowInstance,
  reactFlowWrapper,
  splitView?: boolean,
  selectedNode?: Node
) => {
  const showBlockView = CheckView(VIEW_TYPE.BLOCKVIEW);
  event.preventDefault();
  const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
  const data = JSON.parse(
    event.dataTransfer.getData("application/reactflow")
  ) as LibNode;

  const position = reactFlowInstance.project({
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

  dispatch(addNode(node));

  showBlockView
    ? setElements((es) => es.concat(CreateBlockNode(node, splitView)))
    : setElements((es) => es.concat(CreateTreeNode(node)));

  if (selectedNode) {
    if (!ValidateSameNodeType(selectedNode, node)) return;

    const fromConnector = selectedNode.connectors?.find(
      (x) =>
        x.relationType === RELATION_TYPE.PartOf &&
        x.type === CONNECTOR_TYPE.OUTPUT
    );
    const toConnector = node.connectors?.find(
      (x) =>
        x.relationType === RELATION_TYPE.PartOf &&
        x.type === CONNECTOR_TYPE.INPUT
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

    dispatch(createEdge(partofEdge));
    const edgeType = GetTreeEdgeType(fromConnector);
    setElements((es) => es.concat(CreateTreeEdge(partofEdge, edgeType)));
  }
};

export default useOnDrop;
