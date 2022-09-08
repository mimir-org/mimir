import { Unit } from "@mimirorg/modelbuilder-types";
import { DropdownListBox, DropdownListItem } from "../../../../../../../../compLibrary/dropdown/mimir/Dropdown.styled";

interface Props {
  units: Unit[];
  borderRadius: number;
  borderColor: string;
  height: number;
  listTop: number;
  fontSize: string;

  handleChange: (value: Unit) => void;
}

/**
 * The expanded menu in the ParameterDropdown component.
 * @param interface
 * @returns a menu with clickable elements.
 */
export const ParametersDropdownList = ({
  units,
  borderRadius,
  borderColor,
  height,
  listTop,
  fontSize,

  handleChange,
}: Props) => (
  <DropdownListBox borderRadius={borderRadius} borderColor={borderColor} top={listTop}>
    {units?.map((unit) => {
      return (
        <DropdownListItem
          fontSize={fontSize}
          height={height}
          borderRadius={borderRadius}
          onClick={() => handleChange(unit)}
          key={unit.id}
        >
          <p>{unit.symbol ?? ""}</p>
        </DropdownListItem>
      );
    })}
  </DropdownListBox>
);
