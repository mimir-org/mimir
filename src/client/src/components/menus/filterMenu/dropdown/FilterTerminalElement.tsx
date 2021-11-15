import { Checkbox } from "../../../../compLibrary/input/checkbox/common";
import { MenuListItem } from "./styled";

interface Props {
  checked: boolean;
  label: string;
  onChange: () => void;
}
/**
 * An element in the drop-down menu for terminals in Visual Filter.
 * @param interface
 * @returns an element with a checkbox in the drop-down menu.
 */

const FilterTerminalElement = ({ checked, label, onChange }: Props) => (
  <MenuListItem onClick={() => onChange()}>
    <Checkbox isChecked={checked} onChange={() => onChange()} />

    <p>{label}</p>
  </MenuListItem>
);

export default FilterTerminalElement;
