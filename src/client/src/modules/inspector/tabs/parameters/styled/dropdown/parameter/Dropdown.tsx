import { useState } from "react";
import { MenuWrapper, MenuHeader, MenuList, MenuListItem } from "./styled";
import { ExpandIcon, CollapseIcon } from "../../../../../../../assets/icons/chevron";
import { TextResources } from "../../../../../../../assets/text";
import { CombinedAttributeFilter } from "../../../../../../../models";
import { FilterDict } from "../../../redux/types";
import { Checkbox } from "../../../../../../../compLibrary/checkbox/common";

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
      <div onClick={(e) => setIsListOpen(!isListOpen)}>
        <MenuHeader>
          <p className="searchText">{TextResources.Inspector_Params_Search}</p>
          <img src={isListOpen ? ExpandIcon : CollapseIcon} alt="expand-icon" />
        </MenuHeader>
      </div>
      {isListOpen && (
        <MenuList>
          {items?.map((item) => {
            return (
              <div onClick={() => onChange(item, IsAttributeSelected(item))} key={item.name}>
                <MenuListItem>
                  <p>{item.name}</p>
                  <Checkbox isChecked={IsAttributeSelected(item)} onChange={() => null} />
                </MenuListItem>
              </div>
            );
          })}
        </MenuList>
      )}
    </MenuWrapper>
  );
};

export default Dropdown;
