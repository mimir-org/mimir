import { Dispatch } from "redux";
import { TerminalCategoryFilter } from "./TerminalCategoryFilter";
import { TextResources } from "../../../../../assets/text/TextResources";
import { Edge, Terminal } from "@mimirorg/modelbuilder-types";
import { OnAllTransportsChange } from "./handlers";
import { PopulateTerminalCategoriesForVisualFilter, AreAllTransportsChecked } from "./helpers";
import { FilterElement } from "../FilterElement";
import { memo } from "react";

interface Props {
  edges: Edge[];
  terminals: Terminal[];
  dispatch: Dispatch;
  visible: boolean;
}

/**
 * The transport filter in Visual Filter. This component has one parent checkbox - for all transports.
 * It also returns all transports sorted by the terminal category.
 * @param interface
 * @returns one parent checkbox, and one checkbox for each child.
 */
const TransportFilter = ({ edges, terminals, dispatch, visible }: Props) => {
  const categories = PopulateTerminalCategoriesForVisualFilter(terminals);

  return (
    visible && (
      <>
        <FilterElement
          label={TextResources.TRANSPORTS}
          onChange={() => OnAllTransportsChange(edges, dispatch)}
          isChecked={AreAllTransportsChecked(edges)}
          visible={visible}
          isHeader
        />

        {categories?.map((category) => {
          return (
            <TerminalCategoryFilter
              key={category.name}
              category={category}
              edges={edges}
              dispatch={dispatch}
              visible={!!terminals.length}
            />
          );
        })}
      </>
    )
  );
};

export default memo(TransportFilter);
