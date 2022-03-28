import { useState } from "react";
import { MenuHeader, MenuList, MenuListItem, MenuWrapper } from "./Dropdown.styled";
import { CollapseIcon, ExpandIcon } from "../../../../../../../../../../assets/icons/chevron";
import { TextResources } from "../../../../../../../../../../assets/text/TextResources";
import { CombinedAttributeFilter } from "../../../../../../../../../../models";
import { FilterDict } from "../../../../../parameters/redux/types";
import { Checkbox } from "../../../../../../../../../../compLibrary/input/checkbox/common/Checkbox";

interface Props {
  items: CombinedAttributeFilter[];
  selectedItems: FilterDict;
  onChange: (filter: CombinedAttributeFilter, selected: boolean) => void;
}

export const Dropdown = ({ items, selectedItems, onChange }: Props) => {
  const [isListOpen, setIsListOpen] = useState(false);

  const IsAttributeSelected = (filter: CombinedAttributeFilter): boolean => {
    return !!selectedItems[filter.name];
  };

  return (
    <MenuWrapper>
      <MenuHeader onClick={() => setIsListOpen(!isListOpen)}>
        <p className="searchText">{TextResources.INSPECTOR_PARAMS_SEARCH}</p>
        <img src={isListOpen ? ExpandIcon : CollapseIcon} alt="expand-icon" />
      </MenuHeader>
      {isListOpen && (
        <MenuList>
          {items?.map((item) => {
            return (
              <MenuListItem key={item.name}>
                <Checkbox isChecked={IsAttributeSelected(item)} onChange={() => onChange(item, IsAttributeSelected(item))} />
                <span>{item.name}</span>
              </MenuListItem>
            );
          })}
        </MenuList>
      )}
    </MenuWrapper>
  );
};
