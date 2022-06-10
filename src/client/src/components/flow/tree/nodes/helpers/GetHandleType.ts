import { HandleType, Position } from "react-flow-renderer";
import { Connector } from "@mimirorg/modelbuilder-types";
import {
  IsInputTerminal,
  IsOutputTerminal,
  IsInputVisible,
  IsOutputVisible,
  IsBidirectionalTerminal,
  IsPartOfRelation,
} from "../../../helpers/Connectors";

export const GetHandleType = (conn: Connector): [HandleType, Position] => {
  const sourcePosition = IsPartOfRelation(conn) ? Position.Bottom : Position.Right;
  const targetPosition = IsPartOfRelation(conn) ? Position.Top : Position.Left;

  if (IsInputTerminal(conn) || (IsBidirectionalTerminal(conn) && IsInputVisible(conn))) return ["target", targetPosition];
  if (IsOutputTerminal(conn) || (IsBidirectionalTerminal(conn) && IsOutputVisible(conn))) return ["source", sourcePosition];
  return ["source", sourcePosition];
};
