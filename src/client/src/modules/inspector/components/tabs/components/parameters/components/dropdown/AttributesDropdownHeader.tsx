import { Unit } from "@mimirorg/modelbuilder-types";
import { Color } from "../../../../../../../../assets/color/Color";
import { FontSize } from "../../../../../../../../assets/font";
import { CollapseIcon, ExpandIcon } from "../../../../../../../../assets/icons/chevron";
import { AttributesDropdownHeaderBox } from "./AttributesDropdownHeader.styled";

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
  <AttributesDropdownHeaderBox
    borderRadius={2}
    borderColor={Color.BATTLESHIP_GREY}
    fontSize={FontSize.SMALL}
    height={23}
    onClick={disabled ? null : () => setIsListOpen(!isListOpen)}
  >
    {selectedUnit && (
      <>
        <p>{selectedUnit.symbol}</p>
        <img src={isListOpen ? ExpandIcon : CollapseIcon} alt="expand-icon" />
      </>
    )}
  </AttributesDropdownHeaderBox>
);
