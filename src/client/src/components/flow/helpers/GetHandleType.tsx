import { Position, HandleType } from "react-flow-renderer";
import { Connector } from "../../../models";
import IsInputTerminal from "./IsInputTerminal";
import { IsFulfilledByTerminal, IsLocationTerminal, IsPartOfTerminal, IsTransportTerminal } from "../helpers";

const GetHandleType = (conn: Connector): [HandleType, Position] => {
  if (IsInputTerminal(conn) && IsPartOfTerminal(conn)) return ["target", Position.Top];
  if (!IsInputTerminal(conn) && IsPartOfTerminal(conn)) return ["source", Position.Bottom];
  if (IsInputTerminal(conn) && IsTransportTerminal(conn)) return ["target", Position.Left];
  if (!IsInputTerminal(conn) && IsTransportTerminal(conn)) return ["source", Position.Right];
  if (IsInputTerminal(conn) && (IsLocationTerminal(conn) || IsFulfilledByTerminal(conn)))
    return ["target", Position.Left];

  if (!IsInputTerminal(conn) && (IsLocationTerminal(conn) || IsFulfilledByTerminal(conn)))
    return ["source", Position.Right];
};

export default GetHandleType;
