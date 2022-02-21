import { Color } from "../../../../../compLibrary/colors";
import { Connector } from "../../../../../models";
import { IsLocationTerminal, IsProductTerminal } from "../../../helpers";

const GetTerminalColor = (conn: Connector) => {
  if (conn?.color) return conn.color;
  if (IsProductTerminal(conn)) return Color.ProductSelected;
  if (IsLocationTerminal(conn)) return Color.LocationSelected;
  return Color.Black;
};

export default GetTerminalColor;
