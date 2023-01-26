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
import { IsTerminal } from "../../../../../services";

export const GetHandleType = (conn: Connector): [HandleType, Position] => {
  let sourcePosition = IsPartOfRelation(conn) ? Position.Bottom : Position.Right;
  let targetPosition = IsPartOfRelation(conn) ? Position.Top : Position.Left;

  if (IsTerminal(conn) && conn.isProxy) {
    sourcePosition = Position.Left;
    targetPosition = Position.Right;
  }

  if (IsInputConnector(conn) || (IsBidirectionalTerminal(conn) && IsInputVisible(conn))) return ["target", targetPosition];
  if (IsOutputConnector(conn) || (IsBidirectionalTerminal(conn) && IsOutputVisible(conn))) return ["source", sourcePosition];
  return ["source", sourcePosition];
};
