import {
  Project,
  Node,
  Connector,
  CONNECTOR_TYPE,
  Edge,
  EDGE_TYPE,
} from "../../models/project";
import {
  Elements,
  FlowElement,
  Position,
  HandleType,
  ArrowHeadType,
} from "react-flow-renderer";
export interface GetCenterParams {
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
}

export const getCenter = ({
  sourceX,
  sourceY,
  targetX,
  targetY,
}: GetCenterParams): [number, number, number, number] => {
  const xOffset = Math.abs(targetX - sourceX) / 2;
  const centerX = targetX < sourceX ? targetX + xOffset : targetX - xOffset;

  const yOffset = Math.abs(targetY - sourceY) / 2;
  const centerY = targetY < sourceY ? targetY + yOffset : targetY - yOffset;

  return [centerX, centerY, xOffset, yOffset];
};

export const createId = () => {
  function _p8(s: boolean) {
    var p = (Math.random().toString(16) + "000000000").substr(2, 8);
    return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
  }
  return _p8(false) + _p8(true) + _p8(true) + _p8(false);
};

export const CreateElementNode = (node: Node): FlowElement => {
  let elementNode = null;
  if (!node) return elementNode;

  elementNode = {
    id: node.id,
    type:
      node.type.charAt(0).toUpperCase() + node.type.substring(1).toLowerCase(),
    data: node,
    position: node.position,
    isHidden: node.isHidden,
  };

  return elementNode;
};

export const CreateElementEdge = (
  edge: Edge,
  fromNode: Node,
  toNode: Node
): FlowElement => {
  let elem = {
    id: edge.id,
    type: EDGE_TYPE.DEFAULT,
    source: edge.fromNode,
    target: edge.toNode,
    sourceHandle: edge.fromConnector,
    targetHandle: edge.toConnector,
    arrowHeadType: ArrowHeadType.ArrowClosed,
    label: "",
    data: {
      source: fromNode,
      target: toNode,
    },
  };

  return elem;
};

export const CreateProjectNodes = (project: Project): Elements => {
  const initialElements: Elements = [];

  if (!project) return;

  project.nodes.forEach((node) => {
    const elementNode = CreateElementNode(node);
    if (elementNode) initialElements.push(elementNode);
  });

  project.edges.forEach((edge) => {
    const fromNode = project.nodes.find((x) => x.id === edge.fromNode);
    const toNode = project.nodes.find((x) => x.id === edge.toNode);
    const elementEdge = CreateElementEdge(edge, fromNode, toNode);
    if (elementEdge) initialElements.push(elementEdge);
  });

  return initialElements;
};

// TODO: check this
export const UpdateProjectNodes = (project: Project): Elements => {
  const initialElements: Elements = [];

  if (!project) return;

  project.nodes.forEach((node) => {
    const elementNode = CreateElementNode(node);
    if (elementNode) initialElements.push(elementNode);
  });

  project.edges.forEach((edge) => {
    const fromNode = project.nodes.find((x) => x.id === edge.fromNode);
    const toNode = project.nodes.find((x) => x.id === edge.toNode);
    const elementEdge = CreateElementEdge(edge, fromNode, toNode);
    if (elementEdge) initialElements.push(elementEdge);
  });

  return initialElements;
};

export const processType = (connector: Connector): [HandleType, Position] => {
  switch (connector.type) {
    case CONNECTOR_TYPE.RELATION_OUTPUT || CONNECTOR_TYPE.TRANSPORT_OUTPUT:
      return ["source", Position.Right];
    case CONNECTOR_TYPE.RELATION_INPUT || CONNECTOR_TYPE.TRANSPORT_INPUT:
      return ["target", Position.Left];
    case CONNECTOR_TYPE.PARTOF_INPUT:
      return ["target", Position.Top];
    case CONNECTOR_TYPE.PARTOF_OUTPUT:
      return ["source", Position.Bottom];
    default:
      return ["source", Position.Bottom];
  }
};
