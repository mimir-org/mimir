import { Dispatch } from "redux";
import { TextResources } from "../../../../../assets/text/TextResources";
import { Node, Edge, Relation } from "@mimirorg/modelbuilder-types";
import { OnAllRelationsChange, OnFilterChange } from "./handlers";
import { AreAllProductAndLocationChecked } from "./helpers";
import { FilterElement } from "../FilterElement";

interface Props {
  edges: Edge[];
  nodes: Node[];
  connectors: Relation[];
  dispatch: Dispatch;
  visible: boolean;
}

/**
 * Component for Location and Product filter.
 * @param interface
 * @returns checkboxes to toggle Location and Product relations that exist in Mimir.
 */
export const ProductAndLocationRelationsFilter = ({ edges, nodes, connectors, dispatch, visible }: Props) =>
  visible && (
    <>
      <FilterElement
        label={TextResources.RELATIONS}
        onChange={() => OnAllRelationsChange(edges, dispatch)}
        isChecked={AreAllProductAndLocationChecked(edges)}
        visible={visible}
        isHeader
      />
      {connectors.map((conn) => {
        const edge = edges.find((x) => x.fromConnectorId === conn.id);
        return (
          <FilterElement
            key={conn.id}
            label={conn.name}
            onChange={() => OnFilterChange(edge, edges, nodes, dispatch)}
            isChecked={!edge.hidden}
            indent={2}
            visible
          />
        );
      })}
    </>
  );