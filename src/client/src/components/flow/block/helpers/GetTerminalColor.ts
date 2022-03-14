import { IsLocationTerminal, IsProductTerminal } from "../../helpers";
import { Color } from "../../../../compLibrary/colors/Color";
import { Connector } from "../../../../models";

const GetTerminalColor = (conn: Connector) => {
  if (conn?.color) return conn.color;
  if (IsProductTerminal(conn)) return Color.PRODUCT_SELECTED;
  if (IsLocationTerminal(conn)) return Color.LOCATION_SELECTED;
  return Color.BLACK;
};

export default GetTerminalColor;
