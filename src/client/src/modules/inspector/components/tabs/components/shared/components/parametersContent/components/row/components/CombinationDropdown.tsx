import { useCallback, useMemo, useState } from "react";
import { TextResources } from "../../../../../../../../../../../assets/text";
import { CollapseWhiteIcon, ExpandWhiteIcon } from "../../../../../../../../../../../assets/icons/chevron";
import { CombinedAttribute } from "../../../../../../../../../../../models";
import { MenuHeader, MenuList, MenuListItem, MenuWrapper } from "./CombinationDropdown.styled";
import { Checkbox } from "../../../../../../../../../../../compLibrary/input/checkbox/common";
import { Tooltip } from "../../../../../../../../../../../compLibrary/tooltip/Tooltip";

interface Props {
  items: CombinedAttribute[];
  selectedItems: CombinedAttribute[];
  keyProp: string;
  onChange: (combination: CombinedAttribute, selected: boolean) => void;
  headerColor: string;
  bodyColor: string;
}

export const CombinationDropdown = ({ items, selectedItems, keyProp, onChange, headerColor, bodyColor }: Props) => {
  const [isListOpen, setIsListOpen] = useState(false);

  const IsItemSelected = useCallback(
    (item: CombinedAttribute): boolean => !!selectedItems.find((other) => item.combined === other.combined),
    [selectedItems]
  );

  const areAllItemsSelected = useMemo(
    () => selectedItems.filter(IsItemSelected).length === items?.length,
    [items, selectedItems, IsItemSelected]
  );

  const renderSelectAll = () => {
    const onClick = () =>
      items
        .filter((item) => selectedItems.includes(item) === areAllItemsSelected)
        .forEach((item) => onChange(item, areAllItemsSelected));

    return (
      <MenuListItem color={bodyColor}>
        <Checkbox isChecked={areAllItemsSelected} onChange={onClick} readOnly={true} />
        <span>{TextResources.Inspector_Params_Combinations_Select_All}</span>
      </MenuListItem>
    );
  };

  const renderListItem = (item: CombinedAttribute) => {
    return (
      <Tooltip key={item[keyProp]} content={item.combined} placement={"right"} offset={[0, 10]}>
        <MenuListItem color={bodyColor}>
          <Checkbox isChecked={IsItemSelected(item)} onChange={() => onChange(item, IsItemSelected(item))} readOnly={true} />
          <span>{item.combined}</span>
        </MenuListItem>
      </Tooltip>
    );
  };

  return (
    <MenuWrapper tabIndex={0} onBlur={() => setIsListOpen(false)}>
      <div onClick={() => setIsListOpen(!isListOpen)}>
        <MenuHeader open={isListOpen} color={headerColor}>
          <p>{TextResources.Inspector_Params_Combinations}</p>
          <img src={isListOpen ? CollapseWhiteIcon : ExpandWhiteIcon} alt="expand-icon" />
        </MenuHeader>
      </div>
      {isListOpen && (
        <MenuList color={headerColor}>
          {items.length > 1 && renderSelectAll()}
          {items?.map((item) => renderListItem(item))}
        </MenuList>
      )}
    </MenuWrapper>
  );
};
