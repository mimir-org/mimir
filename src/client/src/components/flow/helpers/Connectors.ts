import { Connector, ConnectorType, ConnectorVisibility, RelationType } from "../../../models";
import { TerminalLikeItem } from "../../../modules/inspector/types";

// ConnectorTypes
export const IsInputTerminal = (terminal: TerminalLikeItem) => {
  return terminal?.type === ConnectorType.Input;
};

export const IsOutputTerminal = (terminal: Connector) => {
  return terminal?.type === ConnectorType.Output;
};

export const IsBidirectionalTerminal = (terminal: TerminalLikeItem) => {
  return terminal?.type === ConnectorType.Bidirectional;
};

// RelationTypes
export const IsPartOfTerminal = (conn: Connector) => {
  return conn?.relationType === RelationType.PartOf;
};

export const IsLocationTerminal = (conn: Connector) => {
  return conn?.relationType === RelationType.HasLocation;
};

export const IsProductTerminal = (conn: Connector) => {
  return conn?.relationType === RelationType.FulfilledBy;
};

export const IsTransport = (conn: Connector) => {
  return conn?.terminalCategory !== undefined;
};

// Connections
export const IsLocationConnection = (source: Connector, target: Connector) => {
  return source?.relationType === RelationType.HasLocation && target?.relationType === RelationType.HasLocation;
};

export const IsPartOfConnection = (sourceConn: Connector, targetConn: Connector) => {
  return IsPartOfTerminal(sourceConn) && IsPartOfTerminal(targetConn);
};

export const IsProductConnection = (source: Connector, target: Connector) => {
  return source?.relationType === RelationType.FulfilledBy && target?.relationType === RelationType.FulfilledBy;
};

export const IsTransportConnection = (source: Connector, target: Connector) => {
  return source?.terminalCategory !== undefined && target?.terminalCategory !== undefined;
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
