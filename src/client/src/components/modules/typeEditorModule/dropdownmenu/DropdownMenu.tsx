import "./dropdownmenu.scss";
import { useState } from "react";
import { Aspect, ObjectType, Status } from "../../../../models";
import { ExpandIcon, CollapseIcon } from "../../../../assets/icons/common";
import { GetDefaultValue, LocationDropdown, IsLocation } from "../helpers";
import {
  DropdownMenuWrapper,
  DropdownMenuHeader,
  DropdownMenuList,
  DropdownMenuListItem,
} from "../../../../compLibrary/dropdown";
interface Props {
  aspect?: Aspect;
  label: string;
  items: any[];
  type: Aspect | ObjectType | Status;
  onChange: Function;
}

export const DropDownMenu = ({
  aspect,
  label,
  items,
  type,
  onChange,
}: Props) => {
  const [isListOpen, setIsListOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(GetDefaultValue(type));

  const toggleList = () => {
    setIsListOpen(!isListOpen);
  };

  const handleChange = ([key, value]) => {
    setSelectedValue(value);
    setIsListOpen(!isListOpen);
    onChange(key);
  };

  return (
    <DropdownMenuWrapper>
      <label htmlFor={label} />
      <div className="label"> {label}</div>
      <div onClick={toggleList}>
        <DropdownMenuHeader>
          <p>{selectedValue}</p>
          <img src={isListOpen ? ExpandIcon : CollapseIcon} alt="expand-icon" />
        </DropdownMenuHeader>
      </div>
      {isListOpen && (
        <DropdownMenuList>
          {IsLocation(aspect) ? (
            <LocationDropdown
              listItems={items}
              setSelectedValue={setSelectedValue}
              setIsListOpen={setIsListOpen}
              isListOpen={isListOpen}
            ></LocationDropdown>
          ) : (
            items?.map(([key, value]) => (
              <div
                className="listitem"
                key={key}
                onClick={() => handleChange([key, value])}
              >
                <DropdownMenuListItem>
                  <p>{value}</p>
                </DropdownMenuListItem>
              </div>
            ))
          )}
        </DropdownMenuList>
      )}
    </DropdownMenuWrapper>
  );
};

export default DropDownMenu;
