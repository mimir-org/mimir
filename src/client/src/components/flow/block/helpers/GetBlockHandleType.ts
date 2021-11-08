import { Connector } from "../../../../models";
import { HandleType, Position } from "react-flow-renderer";
import { IsInputTerminal, IsPartOf } from "../../helpers";

/**
 * Function to give a handle/terminal a position and type.
 * @param conn
 * @param electro
 * @returns a tuple with type and position.
 */
const GetBlockHandleType = (conn: Connector, electro: boolean): [HandleType, Position] => {
  if (!electro) {
    if (IsPartOf(conn)) {
      if (IsInputTerminal(conn)) return ["target", Position.Top];
      return ["source", Position.Bottom];
    }
    if (IsInputTerminal(conn)) return ["target", Position.Left];
    return ["source", Position.Right];
  }

  if (IsInputTerminal(conn)) return ["target", Position.Top];
  return ["source", Position.Bottom];
};

export default GetBlockHandleType;
