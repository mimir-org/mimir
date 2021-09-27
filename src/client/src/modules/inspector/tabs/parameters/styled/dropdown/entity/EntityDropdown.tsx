import { useState } from "react";
import { TextResources } from "../../../../../../../assets/text";
import {
  MenuWrapper,
  MenuHeader,
  MenuList,
  MenuListItem,
  CheckboxWrapper,
} from "./styled";
import {
  ExpandWhiteIcon,
  CollapseWhiteIcon,
} from "../../../../../../../assets/icons/common";

interface DropdownItem {
  id: string;
  key: string;
}
interface Props<T> {
  items: T[];
  selectedItems: string[];
  keyProp: string;
  onChange: (parameterId: string, selected: boolean) => void;
  color: string;
}

const EntityDropdown = <T extends DropdownItem>({
  items,
  selectedItems,
  keyProp,
  onChange,
  color,
}: Props<T>) => {
  const [isListOpen, setIsListOpen] = useState(false);

  const IsItemSelected = (item: T): boolean => {
    return selectedItems.includes(item.id);
  };

  return (
    <MenuWrapper tabIndex={0} onBlur={() => setIsListOpen(false)}>
      <div onClick={(e) => setIsListOpen(!isListOpen)}>
        <MenuHeader open={isListOpen}>
          <p>{TextResources.Inspector_Params_Combinations}</p>
          <img
            src={isListOpen ? ExpandWhiteIcon : CollapseWhiteIcon}
            alt="expand-icon"
          />
        </MenuHeader>
      </div>
      {isListOpen && (
        <MenuList>
          {items?.map((item) => {
            return (
              <div
                onClick={() => onChange(item.id, IsItemSelected(item))}
                key={item[keyProp]}
              >
                <MenuListItem color={color}>
                  <p>{item.key}</p>
                  <CheckboxWrapper>
                    <label className={"checkbox-block"}>
                      <input
                        type="checkbox"
                        checked={IsItemSelected(item)}
                        readOnly={true}
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
  );
};

export default EntityDropdown;
