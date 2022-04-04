import { IsLocationTerminal, IsProductTerminal } from "../../helpers";
import { Color } from "../../../../compLibrary/colors/Color";
import { Connector } from "../../../../models";

const GetTerminalColor = (conn: Connector) => {
  if (conn?.color) return conn.color;
  if (IsProductTerminal(conn)) return Color.VIRIDIAN_GREEN;
  if (IsLocationTerminal(conn)) return Color.PURPLE_MUNSELL;
  return Color.BLACK;
};

export default GetTerminalColor;
