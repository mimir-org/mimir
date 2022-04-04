import { IsInputTerminal, IsOutputTerminal, IsOutputVisible, IsPartOfTerminal } from "../../../../helpers/Connectors";
import { CreateId } from "../../../../helpers";
import { Position } from "../../../../../../models/project";
import { Size } from "../../../../../../compLibrary/size/Size";
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
  offPageNode: Node;
  partOfEdge: Edge;
  transportEdge: Edge;
}

export interface OffPageData {
  sourceNode: Node;
  sourceConnector: Connector;
  position: Position;
}

/**
 * Component to create an OffPage object in BlockView.
 * The component is called from either the CreateRequiredOffPageNode component or the CreateConnectedOffPageNode component.
 * @param data
 * @returns the data type OffPageObject which has a node, a partOf edge and a transport edge.
 */
export const CreateOffPageObject = (data: OffPageData) => {
  const sourceConnector = data.sourceConnector;
  const sourceNode = data.sourceNode;

  if (!sourceConnector || !sourceNode) return null;

  const sourcePartOfConn = sourceNode.connectors.find((c) => IsPartOfTerminal(c) && !IsInputTerminal(c));
  const isTarget = IsOutputTerminal(sourceConnector) || IsOutputVisible(sourceConnector);

  const offPageNode = {
    id: CreateId(),
    name: "OffPage-" + sourceNode.name,
    label: "OffPage-" + sourceNode.label,
    aspect: Aspect.None,
    positionBlockX: data.position.x,
    positionBlockY: sourceNode.positionBlockY + Size.NODE_HEIGHT, // Adjust relative to parent
    connectors: [],
    attributes: [],
    isHidden: false,
    masterProjectId: sourceNode.masterProjectId,
    statusId: sourceNode.statusId,
    projectId: sourceNode.projectId,
    isOffPageTarget: isTarget,
  } as Node;

  //#region Connectors
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
    connectorVisibility: ConnectorVisibility.InputVisible,
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
    connectorVisibility: ConnectorVisibility.OutputVisible,
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
  //#endregion

  //#region Edges
  const partOfEdge = {
    id: CreateId(),
    fromConnector: sourcePartOfConn,
    fromConnectorId: sourcePartOfConn?.id,
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
    fromConnector: isTarget ? sourceConnector : outputConnector,
    fromConnectorId: isTarget ? sourceConnector.id : outputConnector.id,
    toConnector: isTarget ? inputConnector : sourceConnector,
    toConnectorId: isTarget ? inputConnector.id : sourceConnector.id,
    fromNode: isTarget ? sourceNode : offPageNode,
    fromNodeId: isTarget ? sourceNode.id : offPageNode.id,
    toNode: isTarget ? offPageNode : sourceNode,
    toNodeId: isTarget ? offPageNode.id : sourceNode.id,
    isHidden: false,
    kind: EDGE_KIND,
    projectId: sourceNode.projectId,
  } as Edge;
  //#endregion

  return { offPageNode, partOfEdge, transportEdge } as OffPageObject;
};
