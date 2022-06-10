import { Connector } from "@mimirorg/modelbuilder-types";
import { HandleType, Position } from "react-flow-renderer";
import {
  IsInputTerminal,
  IsInputVisible,
  IsOutputTerminal,
  IsOutputVisible,
  IsPartOfRelation,
} from "../../../helpers/Connectors";

/**
 * Function to give a handle/terminal a position and type.
 * @param conn
 * @param electro
 * @param isParent
 * @returns a tuple with type and position.
 */
const GetBlockHandleType = (conn: Connector, electro: boolean, isParent: boolean): [HandleType, Position] => {
  if (IsPartOfRelation(conn)) return GetPartOfHandleType(conn, electro, isParent);

  const sourcePosition = electro ? Position.Top : Position.Left;
  const targetPosition = electro ? Position.Bottom : Position.Right;

  if (IsInputTerminal(conn) || IsInputVisible(conn)) return ["target", targetPosition];
  if (IsOutputTerminal(conn) || IsOutputVisible(conn)) return ["source", sourcePosition];
};

function GetPartOfHandleType(conn: Connector, electro: boolean, isParent: boolean): [HandleType, Position] {
  if (isParent) return GetParentPartOfHandleType(conn, electro);

  const sourcePosition = electro ? Position.Right : Position.Bottom;
  const targetPosition = electro ? Position.Left : Position.Top;

  if (IsInputTerminal(conn) || IsInputVisible(conn)) return ["target", targetPosition];
  if (IsOutputTerminal(conn) || IsOutputVisible(conn)) return ["source", sourcePosition];
}

/**
 *
 * @param conn
 * @param electro
 * @returns
 */
function GetParentPartOfHandleType(conn: Connector, electro: boolean): [HandleType, Position] {
  if (IsInputTerminal(conn) || IsInputVisible(conn)) {
    const inputPos = electro ? Position.Right : Position.Bottom;
    return ["target", inputPos];
  }

  if (IsOutputTerminal(conn) || IsOutputVisible(conn)) {
    const outputPos = electro ? Position.Left : Position.Top;
    return ["source", outputPos];
  }
}

export default GetBlockHandleType;
