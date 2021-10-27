import { Connector } from "../../../../models";
import { HandleType, Position } from "react-flow-renderer";
import { IsProductTerminal, IsInputTerminal, IsOutputTerminal, IsLocationTerminal, IsPartOf, IsTransport } from "../../helpers";

/**
 * Function to give a handle/terminal a position and type.
 * @param conn
 * @param selected
 * @param splitView
 * @param electro
 * @returns a tuple with position and type.
 */
const GetBlockHandleType = (conn: Connector, selected: boolean, splitView: boolean, electro: boolean): [HandleType, Position] => {
  // TODO: Refactor

  if (electro) {
    if (!splitView) {
      if (selected) {
        if (IsInputTerminal(conn)) return ["target", Position.Top];
        if (IsOutputTerminal(conn)) return ["source", Position.Bottom];
      }
    }
    if (IsOutputTerminal(conn) && (IsLocationTerminal(conn) || IsProductTerminal(conn) || IsPartOf(conn))) {
      return ["source", Position.Bottom];
    }

    if (IsOutputTerminal(conn) && IsTransport(conn)) {
      return ["source", Position.Bottom];
    }

    if (IsInputTerminal(conn) && (IsLocationTerminal(conn) || IsProductTerminal(conn) || IsPartOf(conn))) {
      return ["target", Position.Top];
    }

    if (IsInputTerminal(conn) && IsTransport(conn)) {
      return ["target", Position.Top];
    }
    return ["source", Position.Bottom];
  }

  if (!electro) {
    if (!splitView) {
      if (selected) {
        if (IsInputTerminal(conn)) return ["source", Position.Left];
        if (IsOutputTerminal(conn)) return ["target", Position.Right];
      }
    }
    if (IsOutputTerminal(conn) && (IsLocationTerminal(conn) || IsProductTerminal(conn) || IsPartOf(conn))) {
      return ["source", Position.Right];
    }

    if (IsOutputTerminal(conn) && IsTransport(conn)) {
      return ["source", Position.Right];
    }

    if (IsInputTerminal(conn) && (IsLocationTerminal(conn) || IsProductTerminal(conn) || IsPartOf(conn))) {
      return ["target", Position.Left];
    }

    if (IsInputTerminal(conn) && IsTransport(conn)) {
      return ["target", Position.Left];
    }
  }
};

export default GetBlockHandleType;
