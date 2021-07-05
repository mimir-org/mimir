import red from "../../../../redux/store";
import { Connector, Edge, Node } from "../../../../models";
import { IsPartOfTerminal, Legend } from "../../../flow/helpers/common";
import { GetLegendInfo } from "./";
import { IsBlockView } from "../../../flow/helpers/block";

const AddLegend = (node: Node): Legend[] => {
  const edges =
    (red.store.getState().projectState.project?.edges as Edge[]) ?? [];

  const IsActive = (conn: Connector) => {
    let found = false;
    edges.forEach((edge) => {
      if (!IsBlockView()) {
        if (edge.fromConnectorId === conn.id) {
          found = true;
          return;
        }
      } else {
        if (edge.fromConnectorId === conn.id && !IsPartOfTerminal(conn)) {
          found = true;
          return;
        }
      }
    });
    return found;
  };

  const legends = node?.connectors
    ?.filter((conn) => IsActive(conn))
    .map((x) => {
      const [name, color] = GetLegendInfo(x, node);

      return {
        key: x.id,
        name: name,
        color: color,
      };
    });

  return legends;
};

export default AddLegend;
