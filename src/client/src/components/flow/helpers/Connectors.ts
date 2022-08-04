import { TerminalLikeItem } from "../../../modules/inspector/types";
import {
  Connector,
  ConnectorDirection,
  ConnectorVisibility,
  RelationType,
  Relation,
  Terminal,
} from "@mimirorg/modelbuilder-types";

// ConnectorType
export function IsRelationConnector(relationCandidate: Connector): relationCandidate is Relation {
  if ((relationCandidate as Relation).relationType) return true;
  return false;
}

export function IsTerminal(terminalCandidate: Connector): terminalCandidate is Terminal {
  if ((terminalCandidate as Terminal).type) return true;
  return false;
}

// ConnectorDirection
export const IsInputConnector = (terminal: Connector) => {
  return terminal?.type === ConnectorDirection.Input;
};

export const IsOutputConnector = (connector: Connector) => {
  return connector?.type === ConnectorDirection.Output;
};

export const IsBidirectionalTerminal = (terminal: TerminalLikeItem) => {
  return terminal?.type === ConnectorDirection.Bidirectional;
};

// RelationTypes
export const IsPartOfRelation = (conn: Connector) => {
  return IsRelationConnector(conn) && conn?.relationType === RelationType.PartOf;
};

export const IsLocationRelation = (conn: Connector) => {
  return IsRelationConnector(conn) && conn?.relationType === RelationType.HasLocation;
};

export const IsProductRelation = (conn: Connector) => {
  return IsRelationConnector(conn) && conn?.relationType === RelationType.FulfilledBy;
};

// Connections
export const IsLocationConnection = (source: Connector, target: Connector) => {
  return (
    IsRelationConnector(source) &&
    IsRelationConnector(target) &&
    source?.relationType === RelationType.HasLocation &&
    target?.relationType === RelationType.HasLocation
  );
};

export const IsPartOfConnection = (source: Connector, target: Connector) => {
  return IsRelationConnector(source) && IsRelationConnector(target) && IsPartOfRelation(source) && IsPartOfRelation(target);
};

export const IsProductConnection = (source: Connector, target: Connector) => {
  return (
    IsRelationConnector(source) &&
    IsRelationConnector(target) &&
    source?.relationType === RelationType.FulfilledBy &&
    target?.relationType === RelationType.FulfilledBy
  );
};

export const IsTransportConnection = (source: Connector, target: Connector) => {
  return IsTerminal(source) && IsTerminal(target);
};

// ConnectorVisibility
export const IsInputVisible = (connector: Connector) => {
  return connector.connectorVisibility === ConnectorVisibility.InputVisible;
};

export const IsOutputVisible = (connector: Connector) => {
  return connector.connectorVisibility === ConnectorVisibility.OutputVisible;
};

export const IsConnectorVisible = (conn: Connector) => {
  return IsInputVisible(conn) || IsOutputVisible(conn);
};
