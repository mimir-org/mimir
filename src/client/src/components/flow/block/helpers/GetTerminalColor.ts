import { IsLocationTerminal, IsProductTerminal } from "../../helpers/Connectors";
import { Color } from "../../../../compLibrary/colors/Color";
import { Connector } from "../../../../models";

const GetTerminalColor = (connector: Connector) => {
  if (connector?.color) return connector.color;
  if (IsProductTerminal(connector)) return Color.VIRIDIAN_GREEN;
  if (IsLocationTerminal(connector)) return Color.PURPLE_MUNSELL;
  return Color.BLACK;
};

export default GetTerminalColor;
