import { Connector } from "../../../../models";
import { HandleType, Position } from "react-flow-renderer";
import {
  IsFulfilledByTerminal,
  IsInputConnector,
  IsLocationTerminal,
  IsPartOfTerminal,
  IsTransportTerminal,
} from "../common";

const GetBlockHandleType = (conn: Connector): [HandleType, Position] => {
  if (
    !IsInputConnector(conn) &&
    (IsLocationTerminal(conn) ||
      IsFulfilledByTerminal(conn) ||
      IsPartOfTerminal(conn))
  ) {
    return ["source", Position.Right];
  }

  if (!IsInputConnector(conn) && IsTransportTerminal(conn)) {
    return ["source", Position.Right];
  }

  if (
    IsInputConnector(conn) &&
    (IsLocationTerminal(conn) ||
      IsFulfilledByTerminal(conn) ||
      IsPartOfTerminal(conn))
  ) {
    return ["target", Position.Left];
  }

  if (IsInputConnector(conn) && IsTransportTerminal(conn)) {
    return ["target", Position.Left];
  }
};

export default GetBlockHandleType;
