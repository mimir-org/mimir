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
  const sourcePosition = IsPartOf(conn) ? Position.Bottom : Position.Right;
  const targetPosition = IsPartOf(conn) ? Position.Top : Position.Left;

  if (IsInputTerminal(conn) || (IsBidirectionalTerminal(conn) && IsInputVisible(conn))) return ["target", targetPosition];
  if (IsOutputTerminal(conn) || (IsBidirectionalTerminal(conn) && IsOutputVisible(conn))) return ["source", sourcePosition];
  return ["source", sourcePosition];
};
