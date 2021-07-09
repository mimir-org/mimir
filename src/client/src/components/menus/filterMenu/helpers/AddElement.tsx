import { Connector, Node, Edge } from "../../../../models";
import {
  FilterElement,
  IsTransportTerminal,
} from "../../../flow/helpers/common";

const AddElement = (node: Node, edges: Edge[]) => {
  const isActive = (conn: Connector) => {
    let found = false;

    edges.forEach((edge) => {
      if (edge.fromConnectorId === conn.id) {
        found = true;
        return;
      }
    });
    return found;
  };

  return node?.connectors
    ?.filter((conn) => isActive(conn))
    .map((x) => {
      return {
        id: x.id,
        type: IsTransportTerminal(x) ? x.name : x.relationType,
        conn: x,
        name: x.name,
        fromNode: node,
      };
    }) as FilterElement[];
};

export default AddElement;
