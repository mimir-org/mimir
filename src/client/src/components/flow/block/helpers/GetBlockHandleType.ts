import { Connector } from "../../../../models";
import { HandleType, Position } from "react-flow-renderer";
import {
  IsFulfilledByTerminal,
  IsInputTerminal,
  IsOutputTerminal,
  IsLocationTerminal,
  IsPartOfTerminal,
  IsTransportTerminal,
} from "../../helpers";

/**
 * Function to give a handle/terminal a position and type.
 * @param conn
 * @param selected
 * @param splitView
 * @returns a tuple with position(left/right) and type (target/source).
 */
const GetBlockHandleType = (conn: Connector, selected: boolean, splitView: boolean): [HandleType, Position] => {
  // TODO: Refactor
  if (!splitView) {
    if (selected) {
      if (IsInputTerminal(conn)) return ["target", Position.Right];
      if (IsOutputTerminal(conn)) return ["source", Position.Left];
    }
  }
  if (IsOutputTerminal(conn) && (IsLocationTerminal(conn) || IsFulfilledByTerminal(conn) || IsPartOfTerminal(conn))) {
    return ["source", Position.Right];
  }

  if (IsOutputTerminal(conn) && IsTransportTerminal(conn)) {
    return ["source", Position.Right];
  }

  if (IsInputTerminal(conn) && (IsLocationTerminal(conn) || IsFulfilledByTerminal(conn) || IsPartOfTerminal(conn))) {
    return ["target", Position.Left];
  }

  if (IsInputTerminal(conn) && IsTransportTerminal(conn)) {
    return ["target", Position.Left];
  }
  return ["source", Position.Right];
};

export default GetBlockHandleType;
