import { Unit } from "@mimirorg/modelbuilder-types";
import { Color } from "../../../../../../../../assets/color/Color";
import { FontSize } from "../../../../../../../../assets/font";
import { CollapseIcon, ExpandIcon } from "../../../../../../../../assets/icons/chevron";
import { DropdownHeaderBox } from "../../../../../../../../compLibrary/dropdown/mimir/Dropdown.styled";

interface Props {
  disabled: boolean;
  isListOpen: boolean;
  setIsListOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedUnit: Unit;
}

/**
 * The header of the AttributesDropdownMenu.
 * @param interface
 * @returns a clickable header with a value and expand/collapse icon.
 */
export const AttributesDropdownHeader = ({ disabled, isListOpen, setIsListOpen, selectedUnit }: Props) => (
  <DropdownHeaderBox
    borderRadius={2}
    borderColor={Color.BATTLESHIP_GREY}
    fontSize={FontSize.SMALL}
    height={22}
    onClick={disabled ? null : () => setIsListOpen(!isListOpen)}
  >
    {selectedUnit && (
      <>
        <p>{selectedUnit.symbol}</p>
        <img src={isListOpen ? ExpandIcon : CollapseIcon} alt="expand-icon" />
      </>
    )}
  </DropdownHeaderBox>
);
