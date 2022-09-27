import { Unit } from "@mimirorg/modelbuilder-types";
import { useEffect, useState } from "react";
import { AttributesDropdownBox } from "./AttributesDropdown.styled";
import { AttributesDropdownHeader } from "./AttributesDropdownHeader";
import { AttributesDropdownList } from "./ParametersDropdownList";

interface Props {
  label: string;
  units: Unit[];
  onChange: (unitId: string) => void;
  defaultUnitId: string;
  disabled?: boolean;
}

/**
 * Component for a drop-down menu for attributes in the Inspector.
 * @param interface
 * @returns a drop-down menu.
 */
export const AttributesDropdown = ({ label, units, onChange, defaultUnitId, disabled }: Props) => {
  const [isListOpen, setIsListOpen] = useState(false);
  const [selectedUnitId, setSelectedUnitId] = useState<string>(null);

  const selectedUnit = units.find((u) => u.id === selectedUnitId);

  useEffect(() => {
    if (!units) {
      setSelectedUnitId(null);
      return;
    }
    setSelectedUnitId(defaultUnitId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (unit: Unit) => {
    setSelectedUnitId(unit.id);
    setIsListOpen(!isListOpen);
    onChange(unit.id);
  };

  return units?.length ? (
    <AttributesDropdownBox
      disabled={disabled}
      tabIndex={0}
      onBlur={() => {
        setIsListOpen(false);
      }}
    >
      <label htmlFor={label} />
      <AttributesDropdownHeader
        disabled={disabled}
        isListOpen={isListOpen}
        setIsListOpen={setIsListOpen}
        selectedUnit={selectedUnit}
      />
      {isListOpen && <AttributesDropdownList units={units} handleChange={(item: Unit) => handleChange(item)} />}
    </AttributesDropdownBox>
  ) : null;
};
