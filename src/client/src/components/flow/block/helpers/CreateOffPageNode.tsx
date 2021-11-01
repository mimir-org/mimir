import { CreateId, IsInputTerminal, IsPartOf } from "../../helpers";
import { Aspect, Connector, ConnectorType, CONNECTOR_KIND, Edge, Node, Project, RelationType } from "../../../../models";

export interface OffPageNodeCreator {
  node: Node;
  partOfEdge: Edge;
  transportEdge: Edge;
}

export interface CreateOffPageData {
  fromNodeId: string;
  fromConnectorId: string;
  x: number;
  y: number;
}

const CreateOffPageNode = (project: Project, data: CreateOffPageData) => {
  const nodes = project?.nodes;
  const fromNode = nodes?.find((x) => x.id === data.fromNodeId);
  const fromNodeConnector = fromNode?.connectors.find((x) => x.id === data.fromConnectorId);
  const fromNodePartOfConnector = fromNode?.connectors.find((x) => IsPartOf(x) && !IsInputTerminal(x));

  const offPageNode = {
    id: CreateId(),
    name: "OffPage",
    label: "OffPage",
    aspect: Aspect.None,
    positionBlockX: data.x,
    positionBlockY: data.y - 150,
    connectors: [],
    attributes: [],
    isHidden: false,
  } as Node;

  const targetConnector = {
    id: CreateId(),
    name: "TransportConnector",
    type: ConnectorType.Input,
    nodeId: offPageNode.id,
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
    nodeId: offPageNode.id,
    attributes: [],
    semanticReference: "",
  } as Connector;

  offPageNode.connectors.push(targetConnector);
  offPageNode.connectors.push(partOfConnector);

  const partofEdge = {
    id: CreateId(),
    fromConnector: fromNodePartOfConnector,
    fromConnectorId: fromNodePartOfConnector?.id,
    toConnector: partOfConnector,
    toConnectorId: partOfConnector?.id,
    fromNode: fromNode,
    fromNodeId: fromNode.id,
    toNode: offPageNode,
    toNodeId: offPageNode.id,
    isHidden: false,
  } as Edge;

  const transportEdge = {
    id: CreateId(),
    fromConnector: fromNodeConnector,
    fromConnectorId: fromNodeConnector?.id,
    toConnector: targetConnector,
    toConnectorId: targetConnector?.id,
    fromNode: fromNode,
    fromNodeId: fromNode.id,
    toNode: offPageNode,
    toNodeId: offPageNode.id,
    isHidden: false,
  } as Edge;

  return {
    node: offPageNode,
    partOfEdge: partofEdge,
    transportEdge: transportEdge,
  } as OffPageNodeCreator;
};

export default CreateOffPageNode;
