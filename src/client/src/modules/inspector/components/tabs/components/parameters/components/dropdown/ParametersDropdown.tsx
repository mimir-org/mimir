import { Unit } from "@mimirorg/modelbuilder-types";
import { useEffect, useState } from "react";
import { DropdownBox } from "../../../../../../../../compLibrary/dropdown/mimir/Dropdown.styled";
import { ParametersDropdownHeader } from "./ParametersDropdownHeader";
import { ParametersDropdownList } from "./ParametersDropdownList";

interface Props {
  label: string;
  units: Unit[];
  onChange: (unitId: string) => void;
  defaultUnitId: string;
  disabled?: boolean;
  isParameterDropdown?: boolean;
}

/**
 * Component for a drop-down menu for parameters in the Inspector.
 * @param interface
 * @returns a drop-down menu.
 */
export const ParametersDropdown = ({ label, units, onChange, defaultUnitId, disabled, isParameterDropdown }: Props) => {
  const [isListOpen, setIsListOpen] = useState(false);
  const [selectedUnitId, setSelectedUnitId] = useState<string>(null);

  const selectedUnit = units.find((u) => u.id === selectedUnitId);

  useEffect(() => {
    if (!units) {
      setSelectedUnitId(null);
      return;
    }

    setSelectedUnitId(defaultUnitId);
  }, [defaultUnitId, units]);

  const handleChange = (unit: Unit) => {
    setSelectedUnitId(unit.id);
    setIsListOpen(!isListOpen);
    onChange(unit.id);
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
        selectedUnit={selectedUnit}
      />
      {isListOpen && <ParametersDropdownList units={units} handleChange={(item: Unit) => handleChange(item)} />}
    </DropdownBox>
  ) : null;
};
