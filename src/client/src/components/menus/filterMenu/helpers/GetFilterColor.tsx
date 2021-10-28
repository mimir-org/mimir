import { Color } from "../../../../compLibrary";
import { Connector, Node } from "../../../../models";
import { IsProductTerminal, IsFunction, IsLocationTerminal, IsPartOf, IsProduct } from "../../../flow/helpers";

const GetFilterColor = (conn: Connector, nodes: Node[]) => {
  if (conn.color) return conn.color;
  if (IsProductTerminal(conn)) return Color.ProductMain;
  if (IsLocationTerminal(conn)) return Color.LocationMain;

  if (IsPartOf(conn)) {
    const fromNode = nodes.find((n) => n.id === conn.nodeId);
    if (IsFunction(fromNode)) return Color.FunctionMain;
    if (IsProduct(fromNode)) return Color.ProductMain;
    return Color.LocationMain;
  }
};

export default GetFilterColor;
