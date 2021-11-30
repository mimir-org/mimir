import { FilterElement, MaterialFluidFilter } from ".";
import { TextResources } from "../../../assets/text";
import { Connector, Edge } from "../../../models";
import { OnAllTransportChange } from "./handlers";
import { AllTransportsChecked } from "./helpers/IsChecked";

interface Props {
  edges: Edge[];
  items: Connector[];
  dispatch: any;
  visible: boolean;
}

/**
 * Component for transport edges filter.
 * @param interface
 * @returns checkboxes to toggle transport edges that exist in Mimir.
 */
const TransportFilter = ({ edges, items, dispatch, visible }: Props) =>
  visible && (
    <>
      <FilterElement
        label={TextResources.Filter_Transports}
        onChange={() => OnAllTransportChange(edges, dispatch)}
        isChecked={AllTransportsChecked(edges)}
        isHeader={true}
        visible={visible}
      />

      <MaterialFluidFilter edges={edges} items={items} dispatch={dispatch} visible={!!items.length} />

      {/* {items.map((conn) => {
        const edge = edges.find((x) => x.fromConnectorId === conn.id);

        return (
          <FilterElement
            key={conn.id}
            label={conn.name}
            onChange={() => OnFilterChange(edge, edges, dispatch)}
            isChecked={!edge.isHidden}
            visible={visible}
          />
        );
      })} */}
    </>
  );

export default TransportFilter;
