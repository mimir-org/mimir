import { FilterElement } from ".";
import { TextResources } from "../../../assets/text";
import { Connector, Edge } from "../../../models";
import { OnFilterChange } from "./handlers";
interface Props {
  edges: Edge[];
  items: Connector[];
  dispatch: any;
  visible: boolean;
}

/**
 * Component for relations filter.
 * @param interface
 * @returns checkboxes to toggle relations that exist in Mimir.
 */
const RelationFilter = ({ edges, items, dispatch, visible }: Props) =>
  visible && (
    <>
      <FilterElement
        label={TextResources.Filter_Relations}
        onChange={() => null}
        isChecked={true}
        isHeader={true}
        visible={visible}
      />
      {items.map((conn) => {
        const edge = edges.find((x) => x.fromConnectorId === conn.id);
        return (
          <FilterElement
            key={conn.id}
            label={conn.name}
            onChange={() => OnFilterChange(edge, edges, dispatch)}
            isChecked={!edge.isHidden}
            visible={true}
          />
        );
      })}
    </>
  );

export default RelationFilter;
