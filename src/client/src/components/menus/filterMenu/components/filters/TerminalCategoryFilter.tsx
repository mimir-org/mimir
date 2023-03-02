import { Dispatch } from "redux";
import { Edge } from "@mimirorg/modelbuilder-types";
import { OnTerminalCategoryChange, OnTerminalTypeChange } from "./handlers";
import { IsTerminalCategoryChecked, IsTerminalTypeChecked } from "./helpers";
import { FilterElement } from "../FilterElement";
import { TerminalCategoryObject } from "../../../../../lib/models/project";

interface Props {
  category: TerminalCategoryObject;
  edges: Edge[];
  dispatch: Dispatch;
  visible: boolean;
}

/**
 * This component is used as a child component for the Transport Filter in the Visual Filter Module.
 * It has one parent - which is the terminal category element. It also has children - the different terminal types that derive
 * from the terminal category.
 * @param interface
 * @returns a parent checkbox and a checkbox for each child.
 */
export const TerminalCategoryFilter = ({ category, edges, dispatch, visible }: Props) => {
  const isCategoryChecked = IsTerminalCategoryChecked(edges, category.name);

  return (
    visible && (
      <>
        <FilterElement
          label={category.name}
          onChange={() => OnTerminalCategoryChange(edges, category.name, isCategoryChecked, dispatch)}
          isChecked={isCategoryChecked}
          visible={visible}
          indent={2}
          isSubHeader
        />

        {category.terminals.map((t) => {
          const isChecked = IsTerminalTypeChecked(edges, t.terminalParentTypeName, t.terminalTypeId);
          return (
            <FilterElement
              key={t.id}
              label={t.name}
              onChange={() => OnTerminalTypeChange(edges, t.terminalParentTypeName, t.terminalTypeId, isChecked, dispatch)}
              isChecked={isChecked}
              visible={visible}
              indent={3}
            />
          );
        })}
      </>
    )
  );
};
