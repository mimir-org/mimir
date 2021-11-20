import { Color } from "../../../../compLibrary/colors";
import { GetAspectColor } from "../../../../helpers";
import { AspectColorType, Connector, Node } from "../../../../models";
import { IsProductTerminal, IsLocationTerminal, IsPartOf } from "../../../flow/helpers";

const GetFilterColor = (conn: Connector, node: Node) => {
  if (IsProductTerminal(conn)) return Color.ProductMain;
  if (IsLocationTerminal(conn)) return Color.LocationMain;

  if (IsPartOf(conn)) return GetAspectColor(node, AspectColorType.Main);
};

export default GetFilterColor;
