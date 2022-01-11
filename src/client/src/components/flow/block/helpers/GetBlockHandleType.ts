import { Connector } from "../../../../models";
import { HandleType, Position } from "react-flow-renderer";
import { IsBidirectionalTerminal, IsInputTerminal, IsOutputTerminal, IsPartOf } from "../../helpers";

/**
 * Function to give a handle/terminal a position and type.
 * @param conn
 * @param electro
 * @returns a tuple with type and position.
 */
const GetBlockHandleType = (conn: Connector, electro: boolean): [HandleType, Position] => {
  if (electro || IsPartOf(conn)) {
    if (IsInputTerminal(conn)) return ["target", Position.Top];
    if (IsOutputTerminal(conn)) return ["source", Position.Bottom];
  }

  if (IsInputTerminal(conn) || IsBidirectionalTerminal(conn)) return ["target", Position.Left];
  if (IsOutputTerminal(conn) || IsBidirectionalTerminal(conn)) return ["source", Position.Right];
};

export default GetBlockHandleType;
