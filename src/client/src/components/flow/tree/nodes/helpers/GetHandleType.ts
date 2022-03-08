import { HandleType, Position } from "react-flow-renderer";
import { Connector } from "../../../../../models";
import {
  IsInputTerminal,
  IsOutputTerminal,
  IsInputVisible,
  IsOutputVisible,
  IsBidirectionalTerminal,
  IsPartOf,
} from "../../../helpers";

export const GetHandleType = (conn: Connector): [HandleType, Position] => {
  let sourcePosition = Position.Bottom;
  let targetPosition = Position.Top;

  if (!IsPartOf(conn)) {
    sourcePosition = Position.Right;
    targetPosition = Position.Left;
  }

  if (IsInputTerminal(conn) || (IsBidirectionalTerminal(conn) && IsInputVisible(conn))) return ["target", targetPosition];
  if (IsOutputTerminal(conn) || (IsBidirectionalTerminal(conn) && IsOutputVisible(conn))) return ["source", sourcePosition];
  return ["source", sourcePosition];
};
