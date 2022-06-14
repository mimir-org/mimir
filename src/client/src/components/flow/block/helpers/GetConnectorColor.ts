import { Color } from "../../../../assets/color/Color";
import { Connector } from "@mimirorg/modelbuilder-types";
import { IsLocationRelation, IsProductRelation } from "../../helpers/Connectors";

const GetConnectorColor = (connector: Connector) => {
  // if (connector?.color) return connector.color;
  if (IsProductRelation(connector)) return Color.VIRIDIAN_GREEN;
  if (IsLocationRelation(connector)) return Color.PURPLE_MUNSELL;
  // TODO: fix
  return Color.BLACK;
};

export default GetConnectorColor;
