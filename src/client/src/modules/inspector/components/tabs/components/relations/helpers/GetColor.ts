import { Color } from "../../../../../../../assets/color/Color";
import { Connector } from "@mimirorg/modelbuilder-types";

export const GetListItemColor = (index: number) => (index % 2 ? undefined : Color.LAVANDER_WEB_LIST);

export const GetActiveRelationColor = (conn: Connector, index: number) => {
  // if (IsLocationRelation(conn)) return Color.PINK_LACE;
  // if (IsProductRelation(conn)) return Color.CELESTE;
  // TODO: fix
  return GetListItemColor(index);
};
