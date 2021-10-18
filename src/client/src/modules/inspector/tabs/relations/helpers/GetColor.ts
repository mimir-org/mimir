import { Color } from "../../../../../compLibrary";
import { IsLocationTerminal, IsFulfilledByTerminal } from "../../../../../components/flow/helpers";
import { Connector } from "../../../../../models";

export const GetListItemColor = (index: number) => (index % 2 ? undefined : Color.LightPurple);

export const GetActiveRelationColor = (conn: Connector, index: number) => {
  if (IsLocationTerminal(conn)) return Color.LocationHeader;
  if (IsFulfilledByTerminal(conn)) return Color.ProductHeader;
  else return GetListItemColor(index);
};
