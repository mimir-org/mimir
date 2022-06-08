import { GetMimirEdges } from "../../../../../../helpers/Selected";
import { Connector } from "@mimirorg/modelbuilder-types";

/**
 * Component to filter terminals used in TreeView. The filtering is done to reduce renders.
 * PartOf terminals will always be rendered, and transport/relation terminals in use will be rendered.
 * @param connectors
 * @returns a filtered list of terminals.
 */
export const FilterTreeTerminals = (connectors: Connector[]) => {
  const terminals = [] as Connector[];
  const edges = GetMimirEdges();

  // TODO: fix

  connectors.forEach((conn) => {
    // if (IsPartOfRelation(conn)) {
    //   terminals.push(conn);
    //   return;
    // }
    edges.forEach((edge) => {
      if (edge.toConnectorId !== conn.id && edge.fromConnectorId !== conn.id) return;
      terminals.push(conn);
    });
  });

  return terminals;
};
