import { Connector, ConnectorDirection, ConnectorVisibility, RelationType, Relation } from "@mimirorg/modelbuilder-types";
import { TerminalLikeItem } from "../../../modules/inspector/types";

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
export const IsPartOfRelation = (conn: Relation) => {
  return conn?.relationType === RelationType.PartOf;
};

export const IsLocationRelation = (conn: Relation) => {
  return conn?.relationType === RelationType.HasLocation;
};

export const IsProductRelation = (conn: Relation) => {
  return conn?.relationType === RelationType.FulfilledBy;
};

export const IsTransport = (conn: Connector) => {
  return false;
  //return conn?.terminalCategory !== undefined; // TODO: fix
};

// Connections
export const IsLocationConnection = (source: Relation, target: Relation) => {
  return source?.relationType === RelationType.HasLocation && target?.relationType === RelationType.HasLocation;
};

export const IsPartOfConnection = (sourceConn: Relation, targetConn: Relation) => {
  return IsPartOfRelation(sourceConn) && IsPartOfRelation(targetConn);
};

export const IsProductConnection = (source: Relation, target: Relation) => {
  return source?.relationType === RelationType.FulfilledBy && target?.relationType === RelationType.FulfilledBy;
};

export const IsTransportConnection = (source: Connector, target: Connector) => {
  return false;
  //return source?.terminalCategory !== undefined && target?.terminalCategory !== undefined; // TODO:fix
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
