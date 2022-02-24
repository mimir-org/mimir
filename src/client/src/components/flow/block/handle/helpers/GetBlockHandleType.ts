import { Connector } from "../../../../../models";
import { HandleType, Position } from "react-flow-renderer";
import { IsInputTerminal, IsInputVisible, IsOutputTerminal, IsOutputVisible, IsPartOf } from "../../../helpers";

/**
 * Function to give a handle/terminal a position and type.
 * @param conn
 * @param electro
 * @returns a tuple with type and position.
 */
const GetBlockHandleType = (conn: Connector, electro: boolean): [HandleType, Position] => {
  let sourcePosition = electro || IsPartOf(conn) ? Position.Bottom : Position.Right;
  let targetPosition = electro || IsPartOf(conn) ? Position.Top : Position.Left;

  if (electro && IsPartOf(conn)) sourcePosition = Position.Right;
  if (electro && IsPartOf(conn)) targetPosition = Position.Left;

  if (!electro && IsPartOf(conn)) sourcePosition = Position.Bottom;
  if (!electro && IsPartOf(conn)) targetPosition = Position.Top;

  if (IsInputTerminal(conn) || IsInputVisible(conn)) return ["target", targetPosition];
  if (IsOutputTerminal(conn) || IsOutputVisible(conn)) return ["source", sourcePosition];
};

export default GetBlockHandleType;
