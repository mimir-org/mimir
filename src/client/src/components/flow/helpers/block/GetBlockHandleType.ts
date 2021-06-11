import { Connector } from "../../../../models/project";
import { HandleType, Position } from "react-flow-renderer";
import {
  IsFulfilledByTerminal,
  IsInputConnector,
  IsLocationTerminal,
  IsPartOfTerminal,
  IsTransportTerminal,
} from "../common";

const GetBlockHandleType = (
  conn: Connector
): [HandleType, Position, string] => {
  if (
    !IsInputConnector(conn) &&
    (IsLocationTerminal(conn) ||
      IsFulfilledByTerminal(conn) ||
      IsPartOfTerminal(conn))
  ) {
    return ["source", Position.Right, "blockView-handle-right"];
  }

  if (!IsInputConnector(conn) && IsTransportTerminal(conn)) {
    return ["source", Position.Right, "blockView-handle-right"];
  }

  if (
    IsInputConnector(conn) &&
    (IsLocationTerminal(conn) ||
      IsFulfilledByTerminal(conn) ||
      IsPartOfTerminal(conn))
  ) {
    return ["target", Position.Left, "blockView-handle-left"];
  }

  if (IsInputConnector(conn) && IsTransportTerminal(conn)) {
    return ["target", Position.Left, "blockView-handle-left"];
  }
};

export default GetBlockHandleType;
