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
export function IsRelationConnector(connectorToBeChecked: Connector): connectorToBeChecked is Relation {
  if ((connectorToBeChecked as Relation).type) return true;
  return false;
}

export function IsTerminal(connectorToBeChecked: Connector): connectorToBeChecked is Terminal {
  if ((connectorToBeChecked as Terminal).type) return true;
  return false;
}

// ConnectorDirection
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
export const IsPartOfRelation = (conn: Connector) => {
  return IsRelationConnector(conn) ? conn?.relationType === RelationType.PartOf : false;
};

export const IsLocationRelation = (conn: Connector) => {
  return IsRelationConnector(conn) ? conn?.relationType === RelationType.HasLocation : false;
};

export const IsProductRelation = (conn: Connector) => {
  return IsRelationConnector(conn) ? conn?.relationType === RelationType.FulfilledBy : false;
};

// Connections
export const IsLocationConnection = (source: Connector, target: Connector) => {
  return IsRelationConnector(source) && IsRelationConnector(target)
    ? source?.relationType === RelationType.HasLocation && target?.relationType === RelationType.HasLocation
    : false;
};

export const IsPartOfConnection = (source: Connector, target: Connector) => {
  return IsRelationConnector(source) && IsRelationConnector(target)
    ? IsPartOfRelation(source) && IsPartOfRelation(target)
    : false;
};

export const IsProductConnection = (source: Connector, target: Connector) => {
  return IsRelationConnector(source) && IsRelationConnector(target)
    ? source?.relationType === RelationType.FulfilledBy && target?.relationType === RelationType.FulfilledBy
    : false;
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
