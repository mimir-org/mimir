import { Dispatch } from "redux";
import { TextResources } from "../../../../../assets/text/TextResources";
import { OnAllRelationsChange, OnFilterChange } from "./handlers";
import { FilterElement } from "../FilterElement";
import { AspectObject, Connection, Connector } from "lib";

interface Props {
  edges: Connection[];
  nodes: AspectObject[];
  connectors: Connector[];
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
        isChecked={true}
        visible={visible}
        isHeader
      />
      {connectors.map((conn) => {
        const edge = edges.find((x) => x.fromConnector === conn.id);
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
