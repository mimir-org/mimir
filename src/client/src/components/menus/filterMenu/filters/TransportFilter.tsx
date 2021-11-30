import { TerminalCategoryFilter } from ".";
import { FilterElement } from "..";
import { TextResources } from "../../../../assets/text";
import { Connector, Edge, TERMINAL_CATEGORIES } from "../../../../models";
import { OnAllTransportsChange } from "../handlers";
import { GetCategoryName } from "../helpers";
import { AllTransportsChecked } from "../helpers/IsChecked";
interface Props {
  edges: Edge[];
  transportItems: Connector[];
  dispatch: any;
  visible: boolean;
}

/**
 * The transport filter in Visual Filter. This component has one parent checkbox - for all transports.
 * It also returns all transports sorted by the terminal category.
 * @param interface
 * @returns one parent checkbox, and one checkbox for each child.
 */
const TransportFilter = ({ edges, transportItems, dispatch, visible }: Props) =>
  visible && (
    <>
      <FilterElement
        label={TextResources.Filter_Transports}
        onChange={() => OnAllTransportsChange(edges, dispatch)}
        isChecked={AllTransportsChecked(edges)}
        visible={visible}
        isHeader
      />

      {TERMINAL_CATEGORIES.map((_, index) => {
        const items = transportItems.filter((item) => item.terminalCategoryId === TERMINAL_CATEGORIES[index]);
        return (
          <TerminalCategoryFilter
            terminalCategoryId={TERMINAL_CATEGORIES[index]}
            edges={edges}
            items={items}
            label={GetCategoryName(TERMINAL_CATEGORIES[index])}
            dispatch={dispatch}
            visible={!!items.length}
          />
        );
      })}
    </>
  );

export default TransportFilter;
