import { Unit } from "@mimirorg/modelbuilder-types";
import { useEffect, useState } from "react";
import { Color } from "../../../../../../../../assets/color/Color";
import { FontSize } from "../../../../../../../../assets/font";
import { DropdownBox } from "../../../../../../../../compLibrary/dropdown/mimir/Dropdown.styled";
import { ParametersDropdownHeader } from "./ParametersDropdownHeader";
import { ParametersDropdownList } from "./ParametersDropdownList";

interface Props {
  label: string;
  units: Unit[];
  onChange: (item: Unit) => void;
  defaultValue?: Unit;
  disabled?: boolean;
  borderRadius?: number;
  borderColor?: string;
  fontSize?: string;
  height?: number;
  listTop?: number;
  isParameterDropdown?: boolean;
}

/**
 * Component for a drop-down menu in Mimir.
 * @param interface
 * @returns a drop-down menu.
 */
export const ParametersDropdown = ({
  label,
  units,
  onChange,
  defaultValue,
  disabled,
  borderRadius = 5,
  borderColor = Color.BLACK,
  fontSize = FontSize.STANDARD,
  height = 28,
  listTop = 33,
  isParameterDropdown,
}: Props) => {
  const [isListOpen, setIsListOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    if (!units) {
      setSelectedItem(null);
      return;
    }
    if (defaultValue) {
      setSelectedItem(defaultValue);
      return;
    }
    setSelectedItem(units[0]);
  }, [defaultValue, units]);

  const handleChange = (value: Unit) => {
    setSelectedItem(value);
    setIsListOpen(!isListOpen);
    onChange(value);
  };

  return units?.length ? (
    <DropdownBox
      disabled={disabled}
      tabIndex={0}
      isParameterDropdown={isParameterDropdown}
      onBlur={() => {
        setIsListOpen(false);
      }}
    >
      <label htmlFor={label} />
      <ParametersDropdownHeader
        borderRadius={borderRadius}
        borderColor={borderColor}
        fontSize={fontSize}
        height={height}
        disabled={disabled}
        isListOpen={isListOpen}
        setIsListOpen={setIsListOpen}
        selectedItem={selectedItem}
      />
      {isListOpen && (
        <ParametersDropdownList
          units={units}
          borderColor={borderColor}
          borderRadius={borderRadius}
          height={height}
          listTop={listTop}
          fontSize={fontSize}
          handleChange={(item: Unit) => handleChange(item)}
        />
      )}
    </DropdownBox>
  ) : null;
};
