import { CreateId, IsInputTerminal, IsPartOf } from "../../helpers";
import { Aspect, Connector, ConnectorType, CONNECTOR_KIND, Edge, Node, RelationType } from "../../../../models";

export interface OffPageNodeCreator {
  node: Node;
  partOfEdge: Edge;
  transportEdge: Edge;
}

export interface CreateOffPageData {
  sourceNodeId: string;
  sourceConnectorId: string;
  x: number;
  y: number;
}
/**
 * Component to create an OffPageNode.
 * @param project
 * @param data
 * @returns the data type OffPageNodeCreator
 */
const CreateOffPageNode = (sourceNode: Node, data: CreateOffPageData) => {
  const sourceConnector = sourceNode?.connectors.find((x) => x.id === data.sourceConnectorId);
  const sourcePartOfConnector = sourceNode?.connectors.find((x) => IsPartOf(x) && !IsInputTerminal(x));

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

  const inputConnector = {
    id: CreateId(),
    name: "OffpageInConnector",
    type: ConnectorType.Input,
    nodeId: offPageNode.id,
    terminalCategory: sourceConnector.terminalCategory,
    terminalCategoryId: sourceConnector.terminalCategoryId,
    attributes: [],
    semanticReference: "",
    inputOrder: 0,
    outputOrder: 0,
    visible: true,
    color: sourceConnector.color,
    kind: CONNECTOR_KIND,
  } as Connector;

  const outputConnector = {
    id: CreateId(),
    name: "OffpageOutConnector",
    type: ConnectorType.Output,
    nodeId: offPageNode.id,
    terminalCategory: sourceConnector.terminalCategory,
    terminalCategoryId: sourceConnector.terminalCategoryId,
    attributes: [],
    semanticReference: "",
    inputOrder: 0,
    outputOrder: 0,
    visible: true,
    color: sourceConnector.color,
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

  offPageNode.connectors.push(inputConnector);
  offPageNode.connectors.push(outputConnector);
  offPageNode.connectors.push(partOfConnector);

  const partofEdge = {
    id: CreateId(),
    fromConnector: sourcePartOfConnector,
    fromConnectorId: sourcePartOfConnector?.id,
    toConnector: partOfConnector,
    toConnectorId: partOfConnector?.id,
    fromNode: sourceNode,
    fromNodeId: sourceNode.id,
    toNode: offPageNode,
    toNodeId: offPageNode.id,
    isHidden: false,
  } as Edge;

  const transportEdge = {
    id: CreateId(),
    fromConnector: sourceConnector,
    fromConnectorId: sourceConnector?.id,
    toConnector: inputConnector,
    toConnectorId: inputConnector?.id,
    fromNode: sourceNode,
    fromNodeId: sourceNode.id,
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
