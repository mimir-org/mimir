import { Unit } from "@mimirorg/modelbuilder-types";
import { Color } from "../../../../../../../../assets/color/Color";
import { FontSize } from "../../../../../../../../assets/font";
import { DropdownListBox, DropdownListItem } from "../../../../../../../../compLibrary/dropdown/mimir/Dropdown.styled";

interface Props {
  units: Unit[];
  handleChange: (value: Unit) => void;
}

/**
 * The expanded menu in the AttributesDropdown component.
 * @param interface
 * @returns a menu with selectable units.
 */
export const AttributesDropdownList = ({ units, handleChange }: Props) => (
  <DropdownListBox borderRadius={2} borderColor={Color.BATTLESHIP_GREY} top={27}>
    {units?.map((unit) => {
      return (
        <DropdownListItem fontSize={FontSize.SMALL} height={22} borderRadius={2} onClick={() => handleChange(unit)} key={unit.id}>
          <p>{unit.symbol ?? ""}</p>
        </DropdownListItem>
      );
    })}
  </DropdownListBox>
);
