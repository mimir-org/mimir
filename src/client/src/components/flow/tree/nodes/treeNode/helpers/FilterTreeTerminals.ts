import { Connector } from "lib";
import { GetMimirEdges } from "../../../../../../helpers/Selected";

/**
 * Component to filter terminals used in TreeView. The filtering is done to reduce renders.
 * PartOf terminals will always be rendered, and transport/relation terminals in use will be rendered.
 * @param connectors
 * @param filter Visual filter setting
 * @param aspect Node aspect type
 * @returns a filtered list of terminals.
 */
export const FilterTreeTerminals = (connectors: Connector[]) => {
  const terminals = [] as Connector[];
  const edges = GetMimirEdges();

  connectors.forEach((conn) => {
    // if (IsPartOfRelation(conn) || IsLocationRelation(conn) || IsProductRelation(conn)) {
    //   terminals.push(conn);
    //   return;
    // }
    edges.forEach((edge) => {
      if (edge.toConnector !== conn.id && edge.fromConnector !== conn.id) return;
      terminals.push(conn);
    });
  });

  return terminals;
};
