import { TerminalLikeItem } from "../../../modules/inspector/types";
import { Connector, ConnectorDirection, ConnectorVisibility, RelationType } from "@mimirorg/modelbuilder-types";
import { IsRelation, IsTerminal } from "../../../services";

// ConnectorDirection
export const IsInputConnector = (connector: Connector) => {
  return connector?.type === ConnectorDirection.Input;
};

export const IsOutputConnector = (connector: Connector) => {
  return connector?.type === ConnectorDirection.Output;
};

export const IsBidirectionalTerminal = (terminal: TerminalLikeItem) => {
  return terminal?.type === ConnectorDirection.Bidirectional;
};

// RelationTypes
export const IsPartOfRelation = (conn: Connector) => {
  return IsRelation(conn) && conn?.relationType === RelationType.PartOf;
};

export const IsLocationRelation = (conn: Connector) => {
  return IsRelation(conn) && conn?.relationType === RelationType.HasLocation;
};

export const IsProductRelation = (conn: Connector) => {
  return IsRelation(conn) && conn?.relationType === RelationType.FulfilledBy;
};

// Connections
export const IsRelationConnection = (source: Connector, target: Connector): boolean => {
  return IsRelation(source) && IsRelation(target);
};

export const IsLocationConnection = (source: Connector, target: Connector) => {
  return (
    IsRelation(source) &&
    IsRelation(target) &&
    source?.relationType === RelationType.HasLocation &&
    target?.relationType === RelationType.HasLocation
  );
};

export const IsPartOfConnection = (source: Connector, target: Connector) => {
  return IsRelation(source) && IsRelation(target) && IsPartOfRelation(source) && IsPartOfRelation(target);
};

export const IsProductConnection = (source: Connector, target: Connector) => {
  return (
    IsRelation(source) &&
    IsRelation(target) &&
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
