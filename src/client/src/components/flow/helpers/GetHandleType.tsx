import { Position, HandleType } from "react-flow-renderer";
import { Connector } from "../../../models";
import IsInputTerminal from "./IsInputTerminal";
import { IsProductTerminal, IsLocationTerminal, IsPartOf, IsTransport } from "../helpers";

const GetHandleType = (conn: Connector): [HandleType, Position] => {
  if (IsInputTerminal(conn) && IsPartOf(conn)) return ["target", Position.Top];
  if (!IsInputTerminal(conn) && IsPartOf(conn)) return ["source", Position.Bottom];
  if (IsInputTerminal(conn) && IsTransport(conn)) return ["target", Position.Left];
  if (!IsInputTerminal(conn) && IsTransport(conn)) return ["source", Position.Right];
  if (IsInputTerminal(conn) && (IsLocationTerminal(conn) || IsProductTerminal(conn))) return ["target", Position.Left];
  if (!IsInputTerminal(conn) && (IsLocationTerminal(conn) || IsProductTerminal(conn))) return ["source", Position.Right];
};

export default GetHandleType;
