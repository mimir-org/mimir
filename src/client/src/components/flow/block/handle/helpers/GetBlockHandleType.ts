import { Connector } from "../../../../../models";
import { HandleType, Position } from "react-flow-renderer";
import { IsInputTerminal, IsInputVisible, IsOutputTerminal, IsOutputVisible } from "../../../helpers/CheckConnectorTypes";

/**
 * Function to give a handle/terminal a position and type.
 * @param conn
 * @param electro
 * @returns a tuple with type and position.
 */
const GetBlockHandleType = (conn: Connector, electro: boolean): [HandleType, Position] => {
  const sourcePosition = electro ? Position.Bottom : Position.Right;
  const targetPosition = electro ? Position.Top : Position.Left;

  if (IsInputTerminal(conn) || IsInputVisible(conn)) return ["target", targetPosition];
  if (IsOutputTerminal(conn) || IsOutputVisible(conn)) return ["source", sourcePosition];
};

export default GetBlockHandleType;
