import { Color } from "../../../../../../../compLibrary/colors/Color";
import { IsLocationTerminal, IsProductTerminal } from "../../../../../../../components/flow/helpers/Connectors";
import { Connector } from "../../../../../../../models";

export const GetListItemColor = (index: number) => (index % 2 ? undefined : Color.LAVANDER_WEB_LIST);

export const GetActiveRelationColor = (conn: Connector, index: number) => {
  if (IsLocationTerminal(conn)) return Color.PINK_LACE;
  if (IsProductTerminal(conn)) return Color.CELESTE;
  return GetListItemColor(index);
};
