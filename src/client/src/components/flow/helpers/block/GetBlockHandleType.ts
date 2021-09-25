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

/** Component to provide a handle/terminal with position(left/right) and type(target/source)
 *  GetBlockHandleType returns a tuple with the position and type
 */
const GetBlockHandleType = (conn: Connector): [HandleType, Position] => {
  // TODO: Refactor
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
