import { Connector, ConnectorPartOf, ConnectorRelation, ConnectorTerminal, Direction } from "lib";
import { HandleType, Position } from "react-flow-renderer";

// import {
//   IsInputConnector,
//   IsOutputConnector,
//   IsInputVisible,
//   IsOutputVisible,
//   IsBidirectionalTerminal,
//   IsPartOfRelation,
//   IsTerminal,
// } from "../../../helpers/Connectors";

export const GetHandleType = (conn: Connector): [HandleType, Position] => {
  let sourcePosition = conn instanceof ConnectorPartOf ? Position.Bottom : Position.Right;
  let targetPosition = conn instanceof ConnectorRelation ? Position.Top : Position.Left;

  if (conn instanceof ConnectorTerminal) {
    sourcePosition = Position.Left;
    targetPosition = Position.Right;
  }

  if (conn.direction === Direction.Input || conn.direction === Direction.Bidirectional) return ["target", targetPosition];
  if (conn.direction === Direction.Output || conn.direction === Direction.Bidirectional) return ["source", sourcePosition];
  return ["source", sourcePosition];
};
