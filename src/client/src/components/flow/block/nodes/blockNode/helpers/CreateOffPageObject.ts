import { IsInputConnector, IsOutputConnector, IsOutputVisible, IsPartOfRelation } from "../../../../helpers/Connectors";
import { CreateId } from "../../../../helpers";
import { OffPageData, OffPageObject, Position } from "../../../../../../models/project";
import { Size } from "../../../../../../assets/size/Size";
import { TextResources } from "../../../../../../assets/text/TextResources";
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

/**
 * Component to create an OffPage object in BlockView.
 * The component is called from either the CreateRequiredOffPageNode component or the CreateConnectedOffPageNode component.
 * @param data
 * @param isElectroView
 * @returns the data type OffPageObject which has a node, a partOf edge and a transport edge.
 */
export const CreateOffPageObject = (data: OffPageData, isElectroView: boolean) => {
  const sourceConnector = data.sourceConnector;
  const sourceNode = data.sourceNode;

  if (!sourceConnector || !sourceNode) return null;

  const sourcePartOfConn = sourceNode.connectors.find((c) => !IsInputConnector(c) && IsPartOfRelation(c));
  const isTarget = IsOutputConnector(sourceConnector) || IsOutputVisible(sourceConnector);
  const position = SetOffPageNodePosition(data, sourceNode, isElectroView);

  const offPageNode = {
    id: CreateId(),
    name: `OffPage-${sourceNode.name}`,
    label: `OffPage-${sourceNode.label}`,
    aspect: Aspect.None,
    positionBlockX: position.x,
    positionBlockY: position.y,
    connectors: [],
    attributes: [],
    hidden: false,
    masterProjectId: sourceNode.masterProjectId,
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

function SetOffPageNodePosition(data: OffPageData, sourceNode: Node, isElectroView: boolean) {
  const position = { x: data.position.x, y: sourceNode.positionBlockY + Size.NODE_HEIGHT } as Position; // Adjust relative to parent

  if (isElectroView) {
    position.x = 0;
    position.y = 0;
  }

  return position;
}
