import { Position } from "react-flow-renderer";
import { Size } from "../../../../../compLibrary";
import { Connector } from "../../../../../models";
import { IsProductTerminal, IsLocationTerminal } from "../../../helpers";
import { SetTerminalYPos } from "./";

/**
 * Component to set the top position of a terminal in BlockView
 * @param conn
 * @param pos
 * @param electro
 * @param parent
 * @param order
 * @param nodeHeight
 * @param mainConnectNode
 * @returns a number used by the styled component HandleBox.
 */
const SetTopPos = (
  conn: Connector,
  pos: Position,
  electro: boolean,
  parent: boolean,
  order: number,
  nodeHeight: number,
  mainConnectNode: boolean
) => {
  if (!electro) {
    if (IsProductTerminal(conn) || IsLocationTerminal(conn)) return 50;
    return SetTerminalYPos(order, parent, nodeHeight, mainConnectNode);
  }

  if (pos === Position.Top && !parent) return -17;
  if (pos === Position.Top && parent) return -15;
  if (pos === Position.Bottom && !parent && !mainConnectNode) return Size.Node_Length + 3;
  if (pos === Position.Bottom && !parent && mainConnectNode) return nodeHeight + 3;
  if (pos === Position.Bottom && parent) return 602;
};

export default SetTopPos;
