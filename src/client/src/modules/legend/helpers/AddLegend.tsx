import { Connector, Edge, Node } from "../../../models";
import { GetLegendInfo } from "./";
import { IsBlockView } from "../../../components/flow/block/helpers";
import { IsPartOf, Legend } from "../../../components/flow/helpers";

const AddLegend = (node: Node, edges: Edge[]): Legend[] => {
  const IsActive = (conn: Connector) => {
    let found = false;

    edges.forEach((edge) => {
      if (!IsBlockView() && edge.fromConnectorId === conn.id && !edge.isHidden) {
        found = true;
        return;
      }
      if (IsBlockView() && edge.fromConnectorId === conn.id && !edge.isHidden && !IsPartOf(conn)) found = true;
    });
    return found;
  };

  return node?.connectors
    ?.filter((conn) => IsActive(conn))
    .map((x) => {
      const [name, color] = GetLegendInfo(x, node);

      return {
        key: x.id,
        name: name,
        color: color,
      };
    });
};

export default AddLegend;
