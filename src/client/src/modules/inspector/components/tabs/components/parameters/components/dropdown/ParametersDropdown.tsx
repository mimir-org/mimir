import { Unit } from "@mimirorg/modelbuilder-types";
import { useEffect, useState } from "react";
import { DropdownBox } from "../../../../../../../../compLibrary/dropdown/mimir/Dropdown.styled";
import { ParametersDropdownHeader } from "./ParametersDropdownHeader";
import { ParametersDropdownList } from "./ParametersDropdownList";

interface Props {
  label: string;
  units: Unit[];
  onChange: (item: Unit) => void;
  defaultValue: Unit;
  disabled?: boolean;
  isParameterDropdown?: boolean;
}

/**
 * Component for a drop-down menu for parameters in the Inspector.
 * @param interface
 * @returns a drop-down menu.
 */
export const ParametersDropdown = ({ label, units, onChange, defaultValue, disabled, isParameterDropdown }: Props) => {
  const [isListOpen, setIsListOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Unit>(null);

  useEffect(() => {
    if (!units) {
      setSelectedItem(null);
      return;
    }

    setSelectedItem(defaultValue);
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
        disabled={disabled}
        isListOpen={isListOpen}
        setIsListOpen={setIsListOpen}
        selectedItem={selectedItem}
      />
      {isListOpen && <ParametersDropdownList units={units} handleChange={(item: Unit) => handleChange(item)} />}
    </DropdownBox>
  ) : null;
};
