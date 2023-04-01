import { Connector, Direction } from "lib";
import { HandleType, Position } from "react-flow-renderer";
import { ConnectorPartOf } from "../../../../../lib/classes/Connector";

/**
 * Function to give a handle/terminal a position and type.
 * @param conn
 * @param electro
 * @param isParent
 * @returns a tuple with type and position.
 */
const GetBlockHandleType = (conn: Connector, electro: boolean, isParent: boolean): [HandleType, Position] => {
  if (conn instanceof ConnectorPartOf) return GetPartOfHandleType(conn, electro, isParent);

  const sourcePosition = electro ? Position.Top : Position.Left;
  const targetPosition = electro ? Position.Bottom : Position.Right;

  if (conn.direction === Direction.Input) return ["target", targetPosition];
  if (conn.direction === Direction.Output) return ["source", sourcePosition];
};

function GetPartOfHandleType(conn: Connector, electro: boolean, isParent: boolean): [HandleType, Position] {
  if (isParent) return GetParentPartOfHandleType(conn, electro);

  const sourcePosition = electro ? Position.Right : Position.Bottom;
  const targetPosition = electro ? Position.Left : Position.Top;

  if (conn.direction === Direction.Input) return ["target", targetPosition];
  if (conn.direction === Direction.Output) return ["source", sourcePosition];
}

/**
 *
 * @param conn
 * @param electro
 * @returns
 */
function GetParentPartOfHandleType(conn: Connector, electro: boolean): [HandleType, Position] {
  if (conn.direction === Direction.Input) {
    const inputPos = electro ? Position.Right : Position.Bottom;
    return ["target", inputPos];
  }

  if (conn.direction === Direction.Output) {
    const outputPos = electro ? Position.Left : Position.Top;
    return ["source", outputPos];
  }
}

export default GetBlockHandleType;
