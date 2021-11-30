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
        visible={visible}
        isHeader
      />

      <MaterialFluidFilter edges={edges} items={items} dispatch={dispatch} visible={!!items.length} />
    </>
  );

export default TransportFilter;
