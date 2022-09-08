import { Unit } from "@mimirorg/modelbuilder-types";
import { Color } from "../../../../../../../../assets/color/Color";
import { FontSize } from "../../../../../../../../assets/font";
import { CollapseIcon, ExpandIcon } from "../../../../../../../../assets/icons/chevron";
import { DropdownHeaderBox } from "../../../../../../../../compLibrary/dropdown/mimir/Dropdown.styled";

interface Props {
  disabled: boolean;
  isListOpen: boolean;
  setIsListOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedItem: Unit;
}

/**
 * The header of the ParametersDropdownMenu.
 * @param interface
 * @returns a clickable header with a value and expand/collapse icon.
 */
export const ParametersDropdownHeader = ({ disabled, isListOpen, setIsListOpen, selectedItem }: Props) => (
  <DropdownHeaderBox
    borderRadius={2}
    borderColor={Color.BATTLESHIP_GREY}
    fontSize={FontSize.SMALL}
    height={22}
    onClick={disabled ? null : () => setIsListOpen(!isListOpen)}
  >
    {selectedItem && (
      <>
        <p>{selectedItem.symbol}</p>
        <img src={isListOpen ? ExpandIcon : CollapseIcon} alt="expand-icon" />
      </>
    )}
  </DropdownHeaderBox>
);
