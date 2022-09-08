import { Unit } from "@mimirorg/modelbuilder-types";
import { DropdownListBox, DropdownListItem } from "../../../../../../../../compLibrary/dropdown/mimir/Dropdown.styled";
import { Symbol } from "../../../../../../../../compLibrary/symbol";

interface Props {
  units: Unit[];
  borderRadius: number;
  borderColor: string;
  height: number;
  listTop: number;
  fontSize: string;
  valueProp: string;
  valueImageProp?: string;
  keyProp: string;
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
  valueProp,
  valueImageProp,
  keyProp,
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
          key={unit[keyProp]}
        >
          {valueImageProp && <Symbol source={unit[valueImageProp]} text={unit[valueProp]} />}
          <p>{unit.symbol ?? ""}</p>
        </DropdownListItem>
      );
    })}
  </DropdownListBox>
);
