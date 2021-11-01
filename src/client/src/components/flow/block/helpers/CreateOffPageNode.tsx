import { CreateId, IsInputTerminal, IsPartOf } from "../../helpers";
import { Aspect, Connector, ConnectorType, CONNECTOR_KIND, Edge, Node, Project, RelationType } from "../../../../models";

export interface OffPageNodeCreator {
  node: Node;
  partOfEdge: Edge;
  transportEdge: Edge;
}

export interface CreateOffPageData {
  parentNodeId: string;
  fromNodeId: string;
  fromConnectorId: string;
  x: number;
  y: number;
}

const CreateOffPageNode = (project: Project, data: CreateOffPageData) => {
  const nodes = project?.nodes;
  const parentNode = nodes?.find((x) => x.id === data.parentNodeId);
  const parentPartOfConnector = parentNode?.connectors.find((x) => IsPartOf(x) && !IsInputTerminal(x));
  const fromNode = nodes?.find((x) => x.id === data.fromNodeId);
  const fromNodeConnector = fromNode?.connectors.find((x) => x.id === data.fromConnectorId);

  const node = {
    id: CreateId(),
    name: "OffPage",
    label: "OffPage",
    aspect: Aspect.NotSet,
    positionX: data.x,
    positionY: data.y,
    connectors: [],
    attributes: [],
  } as Node;

  const targetConnector = {
    id: CreateId(),
    name: "TransportConnector",
    type: ConnectorType.Input,
    relationType: fromNodeConnector?.relationType,
    nodeId: node.id,
    terminalCategory: fromNodeConnector.terminalCategory,
    terminalCategoryId: fromNodeConnector.terminalCategoryId,
    attributes: [],
    semanticReference: "",
    inputOrder: 0,
    outputOrder: 0,
    visible: true,
    color: fromNodeConnector.color,
    kind: CONNECTOR_KIND,
  } as Connector;

  const partOfConnector = {
    id: CreateId(),
    name: "PartOfConnector",
    type: ConnectorType.Input,
    relationType: RelationType.PartOf,
    nodeId: node.id,
    attributes: [],
    semanticReference: "",
  } as Connector;

  node.connectors.push(targetConnector);
  node.connectors.push(partOfConnector);

  const partofEdge = {
    id: CreateId(),
    fromConnector: parentPartOfConnector,
    fromConnectorId: parentPartOfConnector?.id,
    toConnector: partOfConnector,
    toConnectorId: partOfConnector?.id,
    fromNode: parentNode,
    toNode: node,
    isHidden: false,
  } as Edge;

  const transportEdge = {
    id: CreateId(),
    fromConnector: fromNodeConnector,
    fromConnectorId: fromNodeConnector?.id,
    toConnector: targetConnector,
    toConnectorId: targetConnector?.id,
    fromNode: fromNode,
    toNode: node,
    isHidden: false,
  } as Edge;

  console.log({ transportEdge });

  return {
    node: node,
    partOfEdge: partofEdge,
    transportEdge: transportEdge,
  } as OffPageNodeCreator;
};

export default CreateOffPageNode;
