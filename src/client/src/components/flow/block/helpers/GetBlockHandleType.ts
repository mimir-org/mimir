import { Connector } from "../../../../models";
import { HandleType, Position } from "react-flow-renderer";
import { IsInputTerminal, IsOutputTerminal } from "../../helpers";

/**
 * Function to give a handle/terminal a position and type.
 * @param conn
 * @param electro
 * @returns a tuple with position and type.
 */
const GetBlockHandleType = (conn: Connector, electro: boolean): [HandleType, Position] => {
  if (!electro) {
    if (IsInputTerminal(conn)) return ["target", Position.Left];
    if (IsOutputTerminal(conn)) return ["source", Position.Right];
  }

  if (IsInputTerminal(conn)) return ["target", Position.Top];
  if (IsOutputTerminal(conn)) return ["source", Position.Bottom];
};

export default GetBlockHandleType;
