import { FilterElement } from "..";
import { Connector, Edge } from "../../../../models";
import { OnTerminalTypeChange } from "../handlers";
import { IsTerminalTypeChecked } from "../helpers";

interface Props {
  terminalCategoryId: string;
  edges: Edge[];
  items: Connector[];
  label: string;
  dispatch: any;
  visible: boolean;
  isChecked: boolean;
  onChange: () => void;
}

/**
 * This component is used as a child component for the Transport Filter in the Visual Filter Module.
 * It has one parent - which is the terminal category element. It also has children - the different terminal types that derives
 * from the terminal category.
 * @param interface
 * @returns a parent checkbox and a checkbox for each child.
 */
const TerminalCategoryFilter = ({ terminalCategoryId, edges, items, label, dispatch, visible, isChecked, onChange }: Props) =>
  visible && (
    <>
      <FilterElement label={label} onChange={() => onChange()} isChecked={isChecked} visible={visible} indent={2} />

      {items.map((conn) => {
        return (
          <FilterElement
            key={conn.id}
            label={conn.name}
            onChange={() =>
              OnTerminalTypeChange(
                edges,
                terminalCategoryId,
                conn.terminalTypeId,
                IsTerminalTypeChecked(edges, terminalCategoryId, conn.terminalTypeId),
                dispatch
              )
            }
            isChecked={IsTerminalTypeChecked(edges, terminalCategoryId, conn.terminalTypeId)}
            visible={visible}
            indent={3}
          />
        );
      })}
    </>
  );

export default TerminalCategoryFilter;
