import { CreateId, IsInputTerminal, IsPartOf } from "../../helpers";
import { Aspect, Connector, ConnectorType, CONNECTOR_KIND, Edge, EDGE_KIND, Node, RelationType } from "../../../../models";

export interface OffPageObject {
  node: Node;
  partOfEdge: Edge;
  transportEdge: Edge;
}

export interface OffPageData {
  sourceNodeId: string;
  sourceConnectorId: string;
  x: number;
  y: number;
}
/**
 * Component to create an OffPageNode.
 * @param project
 * @param data
 * @returns the data type OffPageObject.
 */
const CreateOffPageNode = (sourceNode: Node, data: OffPageData) => {
  const sourceConnector = sourceNode?.connectors.find((x) => x.id === data.sourceConnectorId);
  const sourcePartOfConnector = sourceNode?.connectors.find((x) => IsPartOf(x) && !IsInputTerminal(x));
  const marginY = 150;

  const offPageNode = {
    id: CreateId(),
    name: "OffPage-" + sourceNode.name,
    label: "OffPage-" + sourceNode.label,
    aspect: Aspect.None,
    positionBlockX: data.x,
    positionBlockY: data.y - marginY,
    connectors: [],
    attributes: [],
    isHidden: false,
    connectionRequired: true,
    masterProjectId: sourceNode.masterProjectId,
    statusId: sourceNode.statusId,
  } as Node;

  const inputConnector = {
    id: CreateId(),
    name: "OffPageInput",
    type: ConnectorType.Input,
    nodeId: offPageNode.id,
    terminalCategory: sourceConnector.terminalCategory,
    terminalCategoryId: sourceConnector.terminalCategoryId,
    terminalTypeId: sourceConnector.terminalTypeId,
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
    name: "OffPageOutput",
    type: ConnectorType.Output,
    nodeId: offPageNode.id,
    terminalCategory: sourceConnector.terminalCategory,
    terminalCategoryId: sourceConnector.terminalCategoryId,
    terminalTypeId: sourceConnector.terminalTypeId,
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
    name: "OffPagePartOf",
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
    kind: EDGE_KIND,
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
    kind: EDGE_KIND,
  } as Edge;

  return {
    node: offPageNode,
    partOfEdge: partofEdge,
    transportEdge: transportEdge,
  } as OffPageObject;
};

export default CreateOffPageNode;
