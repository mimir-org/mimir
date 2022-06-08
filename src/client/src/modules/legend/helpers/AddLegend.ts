import { Edge, Node } from "../../../models";
import { GetLegendInfo } from "./GetLegendInfo";
import { IsBlockView } from "../../../helpers";
import { IsPartOfRelation } from "../../../components/flow/helpers/Connectors";
import { Legend } from "./types";
import { Connector } from "@mimirorg/modelbuilder-types";

export const AddLegend = (node: Node, edges: Edge[]): Legend[] => {
  const IsActive = (conn: Connector) => {
    let found = false;

    edges.forEach((edge) => {
      if (!IsBlockView() && edge.fromConnectorId === conn.id && !edge.hidden) {
        found = true;
        return;
      }
      if (IsBlockView() && edge.fromConnectorId === conn.id && !edge.hidden && !IsPartOfRelation(conn)) found = true;
    });
    return found;
  };

  return node?.connectors
    ?.filter((conn) => IsActive(conn))
    .map((x) => {
      const [name, color] = GetLegendInfo(x, node);
      return { key: x.id, name, color };
    });
};
