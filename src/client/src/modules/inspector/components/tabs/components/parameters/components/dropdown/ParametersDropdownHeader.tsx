import { Unit } from "@mimirorg/modelbuilder-types";
import { CollapseIcon, ExpandIcon } from "../../../../../../../../assets/icons/chevron";
import { DropdownHeaderBox } from "../../../../../../../../compLibrary/dropdown/mimir/Dropdown.styled";

interface Props {
  borderRadius: number;
  borderColor: string;
  fontSize: string;
  height: number;
  disabled: boolean;
  isListOpen: boolean;
  setIsListOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedItem: Unit;
}

/**
 * The header of the DropdownMenu.
 * @param interface
 * @returns a clickable header with a value and expand/collapse icon.
 */
export const ParametersDropdownHeader = ({
  borderRadius,
  borderColor,
  fontSize,
  height,
  disabled,
  isListOpen,
  setIsListOpen,
  selectedItem,
}: Props) => (
  <DropdownHeaderBox
    borderRadius={borderRadius}
    borderColor={borderColor}
    fontSize={fontSize}
    height={height}
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
