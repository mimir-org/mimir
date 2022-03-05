import { Color } from "../../../../../../../compLibrary/colors/Color";
import { IsLocationTerminal, IsProductTerminal } from "../../../../../../../components/flow/helpers";
import { Connector } from "../../../../../../../models";

export const GetListItemColor = (index: number) => (index % 2 ? undefined : Color.PURPLE_LIGHT);

export const GetActiveRelationColor = (conn: Connector, index: number) => {
  if (IsLocationTerminal(conn)) return Color.LOCATION_HEADER;
  if (IsProductTerminal(conn)) return Color.PRODUCT_HEADER;
  else return GetListItemColor(index);
};
