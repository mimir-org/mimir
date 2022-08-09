import { IsInputConnector, IsOutputConnector, IsOutputVisible } from "../../../../helpers/Connectors";
import { CreateId } from "../../../../helpers";
import { Position } from "../../../../../../models/project";
import { Size } from "../../../../../../assets/size/Size";
import {
  Connector,
  Edge,
  Node,
  ConnectorDirection,
  ConnectorVisibility,
  Aspect,
  Terminal,
  Relation,
  RelationType,
} from "@mimirorg/modelbuilder-types";
import { TextResources } from "../../../../../../assets/text/TextResources";

export interface OffPageObject {
  offPageNode: Node;
  partOfEdge: Edge;
  transportEdge: Edge;
}

export interface OffPageData {
  sourceNode: Node;
  sourceConnector: Connector;
  position: Position;
  isRequired: boolean;
}

/**
 * Component to create an OffPage object in BlockView.
 * The component is called from either the CreateRequiredOffPageNode component or the CreateConnectedOffPageNode component.
 * @param data
 * @returns the data type OffPageObject which has a node, a partOf edge and a transport edge.
 */
export const CreateOffPageObject = (data: OffPageData) => {
  const sourceConnector = data.sourceConnector as Terminal;
  const sourceNode = data.sourceNode;

  if (!sourceConnector || !sourceNode) return null;

  const sourcePartOfConn = sourceNode.connectors.find((c) => !IsInputConnector(c)); //IsPartOfRelation(c) && !IsInputTerminal(c)); // TODO: fix
  const isTarget = IsOutputConnector(sourceConnector) || IsOutputVisible(sourceConnector);

  const offPageNode = {
    id: CreateId(),
    name: `OffPage-${sourceNode.name}`,
    label: `OffPage-${sourceNode.label}`,
    aspect: Aspect.None,
    positionBlockX: data.position.x,
    positionBlockY: sourceNode.positionBlockY + Size.NODE_HEIGHT, // Adjust relative to parent
    connectors: [],
    attributes: [],
    hidden: false,
    masterProjectId: sourceNode.masterProjectId,
    statusId: sourceNode.statusId,
    projectId: sourceNode.projectId,
    parentNodeId: sourceNode.id,
    kind: sourceNode.kind,
    isOffPageRequired: data.isRequired,
    isOffPageTarget: isTarget,
  } as Node;

  const inputConnector = {
    id: CreateId(),
    name: "OffPageInput",
    type: ConnectorDirection.Input,
    nodeId: offPageNode.id,
    terminalCategory: sourceConnector.terminalCategory,
    terminalTypeId: sourceConnector.terminalTypeId,
    connectorVisibility: ConnectorVisibility.InputVisible,
    color: sourceConnector.color,
    kind: TextResources.KIND_CONNECTOR,
  } as Terminal;

  const outputConnector = {
    id: CreateId(),
    name: "OffPageOutput",
    type: ConnectorDirection.Output,
    nodeId: offPageNode.id,
    terminalCategory: sourceConnector.terminalCategory,
    terminalTypeId: sourceConnector.terminalTypeId,
    connectorVisibility: ConnectorVisibility.OutputVisible,
    color: sourceConnector.color,
    kind: TextResources.KIND_CONNECTOR,
  } as Terminal;

  const partOfConnector = {
    id: CreateId(),
    name: "OffPagePartOf",
    type: ConnectorDirection.Input,
    relationType: RelationType.PartOf,
    nodeId: offPageNode.id,
  } as Relation;

  offPageNode.connectors.push(inputConnector);
  offPageNode.connectors.push(outputConnector);
  offPageNode.connectors.push(partOfConnector);

  const partOfEdge = {
    id: CreateId(),
    fromConnector: sourcePartOfConn,
    fromConnectorId: sourcePartOfConn?.id,
    toConnector: partOfConnector as Connector,
    toConnectorId: partOfConnector?.id,
    fromNode: sourceNode,
    fromNodeId: sourceNode.id,
    toNode: offPageNode,
    toNodeId: offPageNode.id,
    hidden: false,
    kind: TextResources.KIND_EDGE,
    projectId: sourceNode.projectId,
  } as Edge;

  const transportEdge = {
    id: CreateId(),
    fromConnector: isTarget ? (sourceConnector as Connector) : outputConnector,
    fromConnectorId: isTarget ? sourceConnector.id : outputConnector.id,
    toConnector: isTarget ? (inputConnector as Connector) : sourceConnector,
    toConnectorId: isTarget ? inputConnector.id : sourceConnector.id,
    fromNode: isTarget ? sourceNode : offPageNode,
    fromNodeId: isTarget ? sourceNode.id : offPageNode.id,
    toNode: isTarget ? offPageNode : sourceNode,
    toNodeId: isTarget ? offPageNode.id : sourceNode.id,
    hidden: false,
    kind: TextResources.KIND_EDGE,
    projectId: sourceNode.projectId,
  } as Edge;

  return { offPageNode, partOfEdge, transportEdge } as OffPageObject;
};
