import { useCallback, useMemo, useState } from "react";
import { TextResources } from "../../../../../../../assets/text";
import { MenuWrapper, MenuHeader, MenuList, MenuListItem, CheckboxWrapper } from "./styled";
import { ExpandWhiteIcon, CollapseWhiteIcon } from "../../../../../../../assets/icons/common";
import { CombinedAttribute } from "../../../../../../../models";

interface Props {
  items: CombinedAttribute[];
  selectedItems: CombinedAttribute[];
  keyProp: string;
  onChange: (combination: CombinedAttribute, selected: boolean) => void;
  color: string;
}

const EntityDropdown = ({ items, selectedItems, keyProp, onChange, color }: Props) => {
  const [isListOpen, setIsListOpen] = useState(false);

  const IsItemSelected = useCallback(
    (item: CombinedAttribute): boolean =>
      !!selectedItems.find((other) => item.combined === other.combined),
    [selectedItems]
  );

  const areAllItemsSelected = useMemo(
    () => selectedItems.filter(IsItemSelected).length === items?.length,
    [items, selectedItems, IsItemSelected]
  );

  const renderSelectAll = () => {
    return (
      <div
        onClick={() =>
          items
            .filter((item) => selectedItems.includes(item) === areAllItemsSelected)
            .forEach((item) => onChange(item, areAllItemsSelected))
        }
      >
        <MenuListItem color={color}>
          <p>{TextResources.Inspector_Params_Combinations_Select_All}</p>
          <CheckboxWrapper>
            <label className={"checkbox-block"}>
              <input type="checkbox" checked={areAllItemsSelected} readOnly={true} />
              <span className="checkmark-block"></span>
            </label>
          </CheckboxWrapper>
        </MenuListItem>
      </div>
    );
  };

  const renderListItem = (item: CombinedAttribute) => {
    return (
      <div onClick={() => onChange(item, IsItemSelected(item))} key={item[keyProp]}>
        <MenuListItem color={color}>
          <p>{item.combined}</p>
          <CheckboxWrapper>
            <label className={"checkbox-block"}>
              <input type="checkbox" checked={IsItemSelected(item)} readOnly={true} />
              <span className="checkmark-block"></span>
            </label>
          </CheckboxWrapper>
        </MenuListItem>
      </div>
    );
  };

  return (
    <MenuWrapper tabIndex={0} onBlur={() => setIsListOpen(false)}>
      <div onClick={() => setIsListOpen(!isListOpen)}>
        <MenuHeader open={isListOpen} color={color}>
          <p>{TextResources.Inspector_Params_Combinations}</p>
          <img src={isListOpen ? ExpandWhiteIcon : CollapseWhiteIcon} alt="expand-icon" />
        </MenuHeader>
      </div>
      {isListOpen && (
        <MenuList>
          {items.length > 1 && renderSelectAll()}
          {items?.map((item) => renderListItem(item))}
        </MenuList>
      )}
    </MenuWrapper>
  );
};

export default EntityDropdown;
