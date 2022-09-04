import { Dispatch } from "redux";
import { TerminalCategoryFilter } from "./TerminalCategoryFilter";
import { TextResources } from "../../../../../assets/text/TextResources";
import { Edge, Terminal } from "@mimirorg/modelbuilder-types";
import { OnAllTransportsChange } from "./handlers";
import { PopulateTerminalCategories, AreAllTransportsChecked } from "./helpers";
import { FilterElement } from "../FilterElement";
import { memo } from "react";

export interface TerminalCategory {
  id: string;
  name: string;
}

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
  const categories = PopulateTerminalCategories(terminals);

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
              key={category.id}
              category={category}
              edges={edges}
              terminals={terminals}
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
