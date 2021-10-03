import { useState } from "react";
import { MenuWrapper, MenuHeader, MenuList, MenuListItem, CheckboxWrapper } from "./styled";
import { ExpandIcon, CollapseIcon } from "../../../../../../../assets/icons/common";
import { TextResources } from "../../../../../../../assets/text";
import { CombinedAttributeFilter } from "../../../../../../../models";
import { FilterDict } from "../../../redux/types";

interface Props {
  items: CombinedAttributeFilter[];
  selectedItems: FilterDict;
  onChange: (filter: CombinedAttributeFilter, selected: boolean) => void;
}

const Dropdown = ({
  items,
  selectedItems,

  onChange,
}: Props) => {
  const [isListOpen, setIsListOpen] = useState(false);

  const IsAttributeSelected = (filter: CombinedAttributeFilter): boolean => {
    return !!selectedItems[filter.name];
  };
  return (
    <>
      <MenuWrapper>
        <div onClick={(e) => setIsListOpen(!isListOpen)}>
          <MenuHeader>
            <>
              <p className="searchText">{TextResources.Inspector_Params_Search}</p>
              <img src={isListOpen ? ExpandIcon : CollapseIcon} alt="expand-icon" />
            </>
          </MenuHeader>
        </div>
        {isListOpen && (
          <MenuList>
            {items?.map((item) => {
              return (
                <div onClick={() => onChange(item, IsAttributeSelected(item))} key={item.name}>
                  <MenuListItem>
                    <p>{item.name}</p>
                    <CheckboxWrapper>
                      <label className={"checkbox-block"}>
                        <input
                          type="checkbox"
                          checked={IsAttributeSelected(item)}
                          onChange={() => null}
                        />
                        <span className="checkmark-block"></span>
                      </label>
                    </CheckboxWrapper>
                  </MenuListItem>
                </div>
              );
            })}
          </MenuList>
        )}
      </MenuWrapper>
    </>
  );
};

export default Dropdown;
