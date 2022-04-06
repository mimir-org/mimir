import { AspectColorType, Connector, Node } from "../../../models";
import { TextResources } from "../../../assets/text/TextResources";
import { Color } from "../../../compLibrary/colors/Color";
import { GetAspectColor } from "../../../helpers";
import {
  IsLocationTerminal,
  IsPartOfTerminal,
  IsProductTerminal,
  IsTransport,
} from "../../../components/flow/helpers/Connectors";

export const GetLegendInfo = (conn: Connector, node: Node) => {
  let color = "";
  let name = "";

  if (IsTransport(conn)) {
    name = conn.name;
    color = conn.color;
    return [name, color];
  }

  if (IsPartOfTerminal(conn)) {
    name = TextResources.PARTOF_RELATIONSHIP;
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
