import { useState } from "react";
import { MenuWrapper, MenuHeader, MenuList, MenuListItem } from "./styled";
import { ExpandIcon, CollapseIcon } from "../../../../../../../assets/icons/chevron";
import { TextResources } from "../../../../../../../assets/text";
import { CombinedAttributeFilter } from "../../../../../../../models";
import { FilterDict } from "../../../redux/types";
import { Checkbox } from "../../../../../../../compLibrary/input/checkbox/common";

interface Props {
  items: CombinedAttributeFilter[];
  selectedItems: FilterDict;
  onChange: (filter: CombinedAttributeFilter, selected: boolean) => void;
}

const Dropdown = ({ items, selectedItems, onChange }: Props) => {
  const [isListOpen, setIsListOpen] = useState(false);

  const IsAttributeSelected = (filter: CombinedAttributeFilter): boolean => {
    return !!selectedItems[filter.name];
  };

  return (
    <MenuWrapper>
      <MenuHeader onClick={(e) => setIsListOpen(!isListOpen)}>
        <p className="searchText">{TextResources.Inspector_Params_Search}</p>
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

export default Dropdown;
