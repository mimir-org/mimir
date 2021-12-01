import { TerminalCategoryFilter } from ".";
import { FilterElement } from "..";
import { TextResources } from "../../../../assets/text";
import { Connector, Edge } from "../../../../models";
import { OnAllTransportsChange } from "../handlers";
import { AllTransportsChecked } from "../helpers/IsChecked";

interface Category {
  id: string;
  name: string;
}
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
const TransportFilter = ({ edges, transportItems, dispatch, visible }: Props) => {
  const categories = [] as Category[];

  transportItems.forEach((item) => {
    if (!categories.some((x: Category) => x.id === item.terminalCategory.id || x.name === item.terminalCategory.name))
      categories.push({ id: item.terminalCategoryId, name: item.terminalCategory.name });
  });

  return (
    visible && (
      <>
        <FilterElement
          label={TextResources.Filter_Transports}
          onChange={() => OnAllTransportsChange(edges, dispatch)}
          isChecked={AllTransportsChecked(edges)}
          visible={visible}
          isHeader
        />

        {categories.map((category, index) => {
          const items = transportItems.filter((item) => item.terminalCategoryId === category.id);
          return (
            <TerminalCategoryFilter
              key={category.id}
              terminalCategoryId={category.id}
              edges={edges}
              items={items}
              label={category.name}
              dispatch={dispatch}
              visible={!!items.length}
            />
          );
        })}
      </>
    )
  );
};

export default TransportFilter;
