import { TerminalLikeItem } from "../../../modules/inspector/types";
import {
  Connector,
  ConnectorDirection,
  ConnectorVisibility,
  RelationType,
  Relation,
  Terminal,
} from "@mimirorg/modelbuilder-types";

// ConnectorTypes
export const IsInputTerminal = (terminal: TerminalLikeItem) => {
  return terminal?.type === ConnectorDirection.Input;
};

export const IsOutputTerminal = (terminal: Connector) => {
  return terminal?.type === ConnectorDirection.Output;
};

export const IsBidirectionalTerminal = (terminal: TerminalLikeItem) => {
  return terminal?.type === ConnectorDirection.Bidirectional;
};

// RelationTypes
export function IsRelationConnector(connectorToBeChecked: Connector): connectorToBeChecked is Relation {
  if ((connectorToBeChecked as Relation).type) return true;
  return false;
}

export function IsTerminal(connectorToBeChecked: Connector): connectorToBeChecked is Terminal {
  if ((connectorToBeChecked as Terminal).type) return true;
  return false;
}

export const IsPartOfRelation = (conn: Connector) => {
  const isRelation = IsRelationConnector(conn);
  if (isRelation) return conn?.relationType === RelationType.PartOf;
  return false;
};

export const IsLocationRelation = (conn: Connector) => {
  const isRelation = IsRelationConnector(conn);
  if (isRelation) return conn?.relationType === RelationType.HasLocation;
  return false;
};

export const IsProductRelation = (conn: Connector) => {
  const isRelation = IsRelationConnector(conn);
  if (isRelation) return conn?.relationType === RelationType.FulfilledBy;
  return false;
};

// Connections
export const IsLocationConnection = (source: Connector, target: Connector) => {
  const isRelation = IsRelationConnector(source) && IsRelationConnector(target);
  if (isRelation) return source?.relationType === RelationType.HasLocation && target?.relationType === RelationType.HasLocation;
  return false;
};

export const IsPartOfConnection = (sourceConn: Connector, targetConn: Connector) => {
  const isRelation = IsRelationConnector(sourceConn) && IsRelationConnector(targetConn);
  if (isRelation) return IsPartOfRelation(sourceConn) && IsPartOfRelation(targetConn);
  return false;
};

export const IsProductConnection = (source: Relation, target: Relation) => {
  const isRelation = IsRelationConnector(source) && IsRelationConnector(target);
  if (isRelation) return source?.relationType === RelationType.FulfilledBy && target?.relationType === RelationType.FulfilledBy;
  return false;
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
