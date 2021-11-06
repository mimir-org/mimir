import { Node, Connector, AspectColorType } from "../../../models";
import { TextResources } from "../../../assets/text";
import { Color } from "../../../compLibrary";
import { IsProductTerminal, IsLocationTerminal, IsPartOf, IsTransport } from "../../../components/flow/helpers";
import { GetAspectColor } from "../../../helpers";

const GetLegendInfo = (conn: Connector, node: Node) => {
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
    color = Color.LocationHeader;
    return [name, color];
  }

  if (IsProductTerminal(conn)) {
    name = conn.name;
    color = GetAspectColor(node, AspectColorType.Main);
    return [name, color];
  }
};

export default GetLegendInfo;
