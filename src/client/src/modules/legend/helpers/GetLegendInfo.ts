import { AspectColorType } from "../../../models";
import { Node, Connector } from "@mimirorg/modelbuilder-types";
import { TextResources } from "../../../assets/text/TextResources";
import { Color } from "../../../assets/color/Color";
import { GetAspectColor } from "../../../helpers";
import { IsLocationRelation, IsPartOfRelation, IsProductRelation, IsTerminal } from "../../../components/flow/helpers/Connectors";

export const GetLegendInfo = (conn: Connector, node: Node) => {
  let color = "";
  let name = "";

  if (IsTerminal(conn)) {
    name = conn.name;
    color = conn.color;
    return [name, color];
  }

  if (IsPartOfRelation(conn)) {
    name = TextResources.PARTOF_RELATIONSHIP;
    color = GetAspectColor(node, AspectColorType.Main);
    return [name, color];
  }

  if (IsLocationRelation(conn)) {
    name = conn.name;
    color = Color.PINK_LACE;
    return [name, color];
  }

  if (IsProductRelation(conn)) {
    name = conn.name;
    color = Color.ELECTRIC_BLUE;
    return [name, color];
  }
};
