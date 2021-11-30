import { TerminalCategoryFilter } from ".";
import { FilterElement } from "..";
import { TextResources } from "../../../../assets/text";
import { Connector, Edge, TERMINAL_CATEGORY_ID } from "../../../../models";
import { OnTerminalCategoryChange, OnAllTransportsChange } from "../handlers";
import { AllTransportsChecked } from "../helpers/IsChecked";
import { IsTerminalCategoryChecked } from "../helpers";

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

      <TerminalCategoryFilter
        terminalCategoryId={TERMINAL_CATEGORY_ID.MATERIAL_FLUID}
        edges={edges}
        items={transportItems.filter((item) => item.terminalCategoryId === TERMINAL_CATEGORY_ID.MATERIAL_FLUID)}
        label={TextResources.Filter_Category_MaterialFluid}
        dispatch={dispatch}
        visible={true}
        isChecked={IsTerminalCategoryChecked(edges, TERMINAL_CATEGORY_ID.MATERIAL_FLUID)}
        onChange={() =>
          OnTerminalCategoryChange(edges, "", IsTerminalCategoryChecked(edges, TERMINAL_CATEGORY_ID.MATERIAL_FLUID), dispatch)
        }
      />
    </>
  );

export default TransportFilter;
