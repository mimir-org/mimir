import { AspectColorType, Connector, Node } from "../../../models";
import { TextResources } from "../../../assets/text";
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
    name = TextResources.Relations_PartOf_Relationship;
    color = GetAspectColor(node, AspectColorType.Main);
    return [name, color];
  }

  if (IsLocationTerminal(conn)) {
    name = conn.name;
    color = Color.LOCATION_HEADER;
    return [name, color];
  }

  if (IsProductTerminal(conn)) {
    name = conn.name;
    color = Color.PRODUCT_MAIN;
    return [name, color];
  }
};
