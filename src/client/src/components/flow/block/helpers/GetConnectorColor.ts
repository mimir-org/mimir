import { Color } from "../../../../assets/color/Color";
import { Connector, Terminal } from "@mimirorg/modelbuilder-types";
import { IsLocationRelation, IsProductRelation, IsTerminal } from "../../helpers/Connectors";

const GetConnectorColor = (connector: Connector | Terminal) => {
  if (IsTerminal(connector)) return connector?.color;
  if (IsProductRelation(connector)) return Color.VIRIDIAN_GREEN;
  if (IsLocationRelation(connector)) return Color.PURPLE_MUNSELL;
  return Color.BLACK;
};

export default GetConnectorColor;
