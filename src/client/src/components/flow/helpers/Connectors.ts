import { ConnectorLikeItem } from "../../../lib/types/Connector";
import { Direction } from "../../../lib/types/enums/Direction";
import { ConnectorCm } from "../../../lib/types/FutureTypes";
import { ConnectorFulfilledBy, ConnectorHasLocation, ConnectorPartOf } from "../../../lib/classes/MimirConnector";

// ConnectorDirection
export const IsInputConnector = (conn: ConnectorCm) => {
  return conn.direction === Direction.Input;
};

export const IsOutputConnector = (conn: ConnectorCm) => {
  return conn.direction === Direction.Output;
};

export const IsBidirectionalTerminal = (conn: ConnectorLikeItem) => {
  return conn.direction === Direction.Bidirectional;
};

// RelationTypes
export const IsPartOfRelation = (conn: ConnectorLikeItem) => {
  return conn instanceof ConnectorPartOf;
};

export const IsLocationRelation = (conn: ConnectorLikeItem) => {
  return conn instanceof ConnectorHasLocation;
};

export const IsProductRelation = (conn: ConnectorLikeItem) => {
  return conn instanceof ConnectorFulfilledBy;
};
