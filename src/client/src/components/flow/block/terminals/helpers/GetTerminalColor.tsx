import { Color } from "../../../../../compLibrary";
import { Connector } from "../../../../../models";
import { IsFulfilledByTerminal, IsLocationTerminal } from "../../../helpers";

const GetTerminalColor = (conn: Connector) => {
  if (conn.color) return conn.color;
  if (IsFulfilledByTerminal(conn)) return Color.ProductSelected;
  if (IsLocationTerminal(conn)) return Color.LocationSelected;
};

export default GetTerminalColor;
