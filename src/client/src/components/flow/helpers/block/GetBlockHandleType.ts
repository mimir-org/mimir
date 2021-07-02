import { Connector } from "../../../../models";
import { HandleType, Position } from "react-flow-renderer";
import {
  IsFulfilledByTerminal,
  IsInputTerminal,
  IsOutputTerminal,
  IsLocationTerminal,
  IsPartOfTerminal,
  IsTransportTerminal,
} from "../common";

const GetBlockHandleType = (conn: Connector): [HandleType, Position] => {
  if (
    IsOutputTerminal(conn) &&
    (IsLocationTerminal(conn) ||
      IsFulfilledByTerminal(conn) ||
      IsPartOfTerminal(conn))
  ) {
    return ["source", Position.Right];
  }

  if (IsOutputTerminal(conn) && IsTransportTerminal(conn)) {
    return ["source", Position.Right];
  }

  if (
    IsInputTerminal(conn) &&
    (IsLocationTerminal(conn) ||
      IsFulfilledByTerminal(conn) ||
      IsPartOfTerminal(conn))
  ) {
    return ["target", Position.Left];
  }

  if (IsInputTerminal(conn) && IsTransportTerminal(conn)) {
    return ["target", Position.Left];
  }
  return ["source", Position.Right];
};

export default GetBlockHandleType;
