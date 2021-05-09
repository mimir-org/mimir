import { LibNode, Node, NodeType } from "../../../models/project";
import { addNode } from "../../../redux/store/project/actions";
import { CreateId, CreateElementNode } from "./../helpers";

const useOnDrop = (
  event,
  dispatch,
  setElements,
  reactFlowInstance,
  reactFlowWrapper
) => {
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
    name: data.name,
    label: data.label ?? data.name,
    type: data.type as NodeType,
    positionX: position.x,
    positionY: position.y,
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
  setElements((es) => es.concat(CreateElementNode(node)));
};

export default useOnDrop;
