import { HandleType, Position } from "react-flow-renderer";
import { Connector } from "@mimirorg/modelbuilder-types";
import {
  IsInputConnector,
  IsOutputConnector,
  IsInputVisible,
  IsOutputVisible,
  IsBidirectionalTerminal,
  IsPartOfRelation,
} from "../../../helpers/Connectors";

export const GetHandleType = (conn: Connector): [HandleType, Position] => {
  const sourcePosition = IsPartOfRelation(conn) ? Position.Bottom : Position.Right;
  const targetPosition = IsPartOfRelation(conn) ? Position.Top : Position.Left;

  if (IsInputConnector(conn) || (IsBidirectionalTerminal(conn) && IsInputVisible(conn))) return ["target", targetPosition];
  if (IsOutputConnector(conn) || (IsBidirectionalTerminal(conn) && IsOutputVisible(conn))) return ["source", sourcePosition];
  return ["source", sourcePosition];
};
