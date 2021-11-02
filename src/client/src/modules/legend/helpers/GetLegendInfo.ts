import { Node, Connector } from "../../../models";
import { GetAspectPartColor } from "../../../assets/helpers";
import { TextResources } from "../../../assets/text";
import { Color } from "../../../compLibrary";
import { IsProductTerminal, IsLocationTerminal, IsPartOf, IsTransport } from "../../../components/flow/helpers";

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
    color = GetAspectPartColor(node.aspect);
    return [name, color];
  }

  if (IsLocationTerminal(conn)) {
    name = conn.name;
    color = Color.LocationHeader;
    return [name, color];
  }

  if (IsProductTerminal(conn)) {
    name = conn.name;
    color = GetAspectPartColor(node.aspect);
    return [name, color];
  }
};

export default GetLegendInfo;
