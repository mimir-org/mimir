import { AspectColorType, Connector, Node } from "../../../models";
import { TextResources } from "../../../assets/text/TextResources";
import { Color } from "../../../compLibrary/colors/Color";
import { IsLocationTerminal, IsPartOf, IsProductTerminal, IsTransport } from "../../../components/flow/helpers";
import { GetAspectColor } from "../../../helpers";

export const GetLegendInfo = (conn: Connector, node: Node) => {
  let color = "";
  let name = "";

  if (IsTransport(conn)) {
    name = conn.name;
    color = conn.color;
    return [name, color];
  }

  if (IsPartOf(conn)) {
    name = TextResources.RELATIONS_PARTOF_RELATIONSHIP;
    color = GetAspectColor(node, AspectColorType.Main);
    return [name, color];
  }

  if (IsLocationTerminal(conn)) {
    name = conn.name;
    color = Color.PINK_LACE;
    return [name, color];
  }

  if (IsProductTerminal(conn)) {
    name = conn.name;
    color = Color.ELECTRIC_BLUE;
    return [name, color];
  }
};
