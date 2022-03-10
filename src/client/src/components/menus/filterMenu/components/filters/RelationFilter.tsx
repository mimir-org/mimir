import { Dispatch } from "redux";
import { FilterElement } from "./FilterElement";
import { TextResources } from "../../../../../assets/text/TextResources";
import { Connector, Edge } from "../../../../../models";
import { OnAllRelationsChange, OnFilterChange } from "./handlers";
import { AllRelationsChecked } from "./helpers";

interface Props {
  edges: Edge[];
  items: Connector[];
  dispatch: Dispatch;
  visible: boolean;
}

/**
 * Component for relations filter.
 * @param interface
 * @returns checkboxes to toggle relations that exist in Mimir.
 */
export const RelationFilter = ({ edges, items, dispatch, visible }: Props) =>
  visible && (
    <>
      <FilterElement
        label={TextResources.RELATIONS}
        onChange={() => OnAllRelationsChange(edges, dispatch)}
        isChecked={AllRelationsChecked(edges)}
        visible={visible}
        isHeader
      />
      {items.map((conn) => {
        const edge = edges.find((x) => x.fromConnectorId === conn.id);
        return (
          <FilterElement
            key={conn.id}
            label={conn.name}
            onChange={() => OnFilterChange(edge, edges, dispatch)}
            isChecked={!edge.isHidden}
            indent={2}
            visible
          />
        );
      })}
    </>
  );
