import { Dispatch } from "redux";
import { Edge, Connector } from "@mimirorg/modelbuilder-types";
import { OnTerminalCategoryChange, OnTerminalTypeChange } from "./handlers";
import { IsTerminalCategoryChecked } from "./helpers";
import { TerminalCategory } from "./TransportFilter";
import { FilterElement } from "../FilterElement";

interface Props {
  category: TerminalCategory;
  edges: Edge[];
  connectors: Connector[];
  dispatch: Dispatch;
  visible: boolean;
}

/**
 * This component is used as a child component for the Transport Filter in the Visual Filter Module.
 * It has one parent - which is the terminal category element. It also has children - the different terminal types that derives
 * from the terminal category.
 * @param interface
 * @returns a parent checkbox and a checkbox for each child.
 */
export const TerminalCategoryFilter = ({ category, edges, connectors, dispatch, visible }: Props) => {
  const isCategoryChecked = IsTerminalCategoryChecked(edges, category.id);

  return (
    visible && (
      <>
        <FilterElement
          label={category.name}
          onChange={() => OnTerminalCategoryChange(edges, category.id, isCategoryChecked, dispatch)}
          isChecked={isCategoryChecked}
          visible={visible}
          indent={2}
          isSubHeader
        />

        {connectors.map((conn) => {
          const isChecked = false; // IsTerminalTypeChecked(edges, category.id, conn.terminalTypeId);
          return (
            <FilterElement
              key={conn.id}
              label={conn.name}
              onChange={() => OnTerminalTypeChange(edges, category.id, null, isChecked, dispatch)} // TODO: fix conn.terminalTypeId
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
