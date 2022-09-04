import { Dispatch } from "redux";
import { Edge, Terminal } from "@mimirorg/modelbuilder-types";
import { OnTerminalCategoryChange, OnTerminalTypeChange } from "./handlers";
import { IsTerminalCategoryChecked, IsTerminalTypeChecked } from "./helpers";
import { TerminalCategory } from "./TransportTerminalsFilter";
import { FilterElement } from "../FilterElement";

interface Props {
  category: TerminalCategory;
  edges: Edge[];
  terminals: Terminal[];
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
export const TerminalCategoryFilter = ({ category, edges, terminals, dispatch, visible }: Props) => {
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

        {terminals.map((t) => {
          const isChecked = IsTerminalTypeChecked(edges, t.terminalCategory, t.terminalTypeId);
          return (
            <FilterElement
              key={t.id}
              label={t.name}
              onChange={() => OnTerminalTypeChange(edges, t.terminalCategory, t.terminalTypeId, isChecked, dispatch)}
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
