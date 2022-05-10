import { Dispatch } from "redux";
import { TerminalCategoryFilter } from "./TerminalCategoryFilter";
import { TextResources } from "../../../../../assets/text/TextResources";
import { Connector, Edge } from "../../../../../models";
import { OnAllTransportsChange } from "./handlers";
import { PopulateTerminalCategories, AllTransportsChecked } from "./helpers";
import { FilterElement } from "../FilterElement";
import { memo } from "react";

export interface TerminalCategory {
  id: string;
  name: string;
}

interface Props {
  edges: Edge[];
  items: Connector[];
  dispatch: Dispatch;
  visible: boolean;
}

/**
 * The transport filter in Visual Filter. This component has one parent checkbox - for all transports.
 * It also returns all transports sorted by the terminal category.
 * @param interface
 * @returns one parent checkbox, and one checkbox for each child.
 */
const TransportFilter = ({ edges, items, dispatch, visible }: Props) => {
  const categories = PopulateTerminalCategories(items);

  return (
    visible && (
      <>
        <FilterElement
          label={TextResources.TRANSPORTS}
          onChange={() => OnAllTransportsChange(edges, dispatch)}
          isChecked={AllTransportsChecked(edges)}
          visible={visible}
          isHeader
        />

        {categories?.map((category) => {
          const categoryItems = items.filter((item) => item.terminalCategoryId === category.id);
          return (
            <TerminalCategoryFilter
              key={category.id}
              category={category}
              edges={edges}
              items={categoryItems}
              dispatch={dispatch}
              visible={!!categoryItems.length}
            />
          );
        })}
      </>
    )
  );
};

export default memo(TransportFilter);
