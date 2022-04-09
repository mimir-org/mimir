import { Dispatch } from "redux";
import { TextResources } from "../../../../../assets/text/TextResources";
import { Connector, Edge, Node } from "../../../../../models";
import { OnAllRelationsChange, OnFilterChange } from "./handlers";
import { AllRelationsChecked } from "./helpers";
import { FilterElement } from "../FilterElement";

interface Props {
  edges: Edge[];
  nodes: Node[];
  items: Connector[];
  dispatch: Dispatch;
  visible: boolean;
}

/**
 * Component for relations filter.
 * @param interface
 * @returns checkboxes to toggle relations that exist in Mimir.
 */
export const RelationFilter = ({ edges, nodes, items, dispatch, visible }: Props) =>
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
            onChange={() => OnFilterChange(edge, edges, nodes, dispatch)}
            isChecked={!edge.isHidden}
            indent={2}
            visible
          />
        );
      })}
    </>
  );
