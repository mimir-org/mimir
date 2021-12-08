import { Color } from "../../../../../compLibrary/colors";
import { Connector } from "../../../../../models";
import { IsProductTerminal, IsLocationTerminal } from "../../../helpers";

const GetTerminalColor = (conn: Connector) => {
  if (conn?.color) return conn?.color;
  if (IsProductTerminal(conn)) return Color.ProductSelected;
  if (IsLocationTerminal(conn)) return Color.LocationSelected;
};

export default GetTerminalColor;
