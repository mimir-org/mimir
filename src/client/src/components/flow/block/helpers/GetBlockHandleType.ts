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
  const sourcePosition = electro || IsPartOf(conn) ? Position.Bottom : Position.Right;
  const targetPosition = electro || IsPartOf(conn) ? Position.Top : Position.Left;

  if (IsInputTerminal(conn) || conn.isBidirectionalInput) return ["target", targetPosition];
  return ["source", sourcePosition];
};

export default GetBlockHandleType;
