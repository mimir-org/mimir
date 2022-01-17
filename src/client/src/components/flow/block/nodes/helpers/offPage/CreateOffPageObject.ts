import { CreateId, IsInputTerminal, IsOutputTerminal, IsPartOf } from "../../../../helpers";
import { Position } from "../../../../../../models/project";
import {
  Aspect,
  CONNECTOR_KIND,
  Connector,
  ConnectorType,
  EDGE_KIND,
  Edge,
  Node,
  RelationType,
  ConnectorVisibility,
} from "../../../../../../models";

export interface OffPageObject {
  node: Node;
  partOfEdge: Edge;
  transportEdge: Edge;
}

export interface OffPageData {
  sourceNode: Node;
  sourceConnector: Connector;
  position: Position;
}

/**
 * Component to create an OffPage object.
 * @param data
 * @returns the data type OffPageObject which has a node, a partOf edge and a transport edge.
 */
const CreateOffPageObject = (data: OffPageData) => {
  const sourceConnector = data.sourceConnector;
  const sourceNode = data.sourceNode;
  const sourcePartOfConnector = sourceNode?.connectors?.find((x) => IsPartOf(x) && !IsInputTerminal(x));
  const offPageNodeIsTarget = IsOutputTerminal(sourceConnector);
  const marginY = 80;

  const offPageNode = {
    id: CreateId(),
    name: "OffPage-" + sourceNode.name,
    label: "OffPage-" + sourceNode.label,
    aspect: Aspect.None,
    positionBlockX: data.position.x,
    positionBlockY: data.position.y - marginY,
    connectors: [],
    attributes: [],
    isHidden: false,
    masterProjectId: sourceNode.masterProjectId,
    statusId: sourceNode.statusId,
    projectId: sourceNode.projectId,
  } as Node;

  const inputConnector = {
    id: CreateId(),
    name: "OffPageInput",
    type: ConnectorType.Input,
    nodeId: offPageNode.id,
    terminalCategory: sourceConnector?.terminalCategory,
    terminalCategoryId: sourceConnector?.terminalCategoryId,
    terminalTypeId: sourceConnector?.terminalTypeId,
    attributes: [],
    semanticReference: "",
    inputOrder: 0,
    outputOrder: 0,
    connectorVisibility: ConnectorVisibility.InputVisible,
    color: sourceConnector?.color,
    kind: CONNECTOR_KIND,
  } as Connector;

  const outputConnector = {
    id: CreateId(),
    name: "OffPageOutput",
    type: ConnectorType.Output,
    nodeId: offPageNode.id,
    terminalCategory: sourceConnector?.terminalCategory,
    terminalCategoryId: sourceConnector?.terminalCategoryId,
    terminalTypeId: sourceConnector?.terminalTypeId,
    attributes: [],
    semanticReference: "",
    inputOrder: 0,
    outputOrder: 0,
    connectorVisibility: ConnectorVisibility.OutputVisible,
    color: sourceConnector?.color,
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
    projectId: sourceNode.projectId,
  } as Edge;

  const transportEdge = {
    id: CreateId(),
    fromConnector: offPageNodeIsTarget ? sourceConnector : outputConnector,
    fromConnectorId: offPageNodeIsTarget ? sourceConnector.id : outputConnector?.id,
    toConnector: offPageNodeIsTarget ? inputConnector : sourceConnector,
    toConnectorId: offPageNodeIsTarget ? inputConnector.id : sourceConnector?.id,
    fromNode: offPageNodeIsTarget ? sourceNode : offPageNode,
    fromNodeId: offPageNodeIsTarget ? sourceNode.id : offPageNode.id,
    toNode: offPageNodeIsTarget ? offPageNode : sourceNode,
    toNodeId: offPageNodeIsTarget ? offPageNode.id : sourceNode.id,
    isHidden: false,
    kind: EDGE_KIND,
    projectId: sourceNode.projectId,
  } as Edge;

  return {
    node: offPageNode,
    partOfEdge: partofEdge,
    transportEdge: transportEdge,
  } as OffPageObject;
};

export default CreateOffPageObject;
