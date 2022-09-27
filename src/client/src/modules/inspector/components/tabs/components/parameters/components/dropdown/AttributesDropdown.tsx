import { Unit } from "@mimirorg/modelbuilder-types";
import { useEffect, useState } from "react";
import { Color } from "../../../../../../../../assets/color/Color";
import { CollapseIcon, ExpandIcon } from "../../../../../../../../assets/icons/chevron";
import {
  AttributesDropdownBox,
  AttributesDropdownHeaderBox,
  AttributesDropdownListBox,
  AttributesDropdownListItem,
} from "./AttributesDropdown.styled";

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

  if (!units?.length) return null;

  return (
    <AttributesDropdownBox
      disabled={disabled}
      tabIndex={0}
      onBlur={() => {
        setIsListOpen(false);
      }}
    >
      <label htmlFor={label} />
      <AttributesDropdownHeaderBox
        borderColor={Color.BATTLESHIP_GREY}
        onClick={disabled ? null : () => setIsListOpen(!isListOpen)}
      >
        {selectedUnit && (
          <>
            <p>{selectedUnit.symbol}</p>
            <img src={isListOpen ? ExpandIcon : CollapseIcon} alt="expand-icon" />
          </>
        )}
      </AttributesDropdownHeaderBox>
      {isListOpen && (
        <AttributesDropdownListBox borderColor={Color.BATTLESHIP_GREY}>
          {units?.map((unit) => {
            return (
              <AttributesDropdownListItem onClick={() => handleChange(unit)} key={unit.id}>
                <p>{unit.symbol ?? ""}</p>
              </AttributesDropdownListItem>
            );
          })}
        </AttributesDropdownListBox>
      )}
    </AttributesDropdownBox>
  );
};
