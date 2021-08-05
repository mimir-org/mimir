import "./dropdownmenu.scss";
import { useState, useEffect } from "react";
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
  disabled?: boolean;
}

export const DropDownMenu = ({
  aspect,
  label,
  items,
  type,
  onChange,
  disabled,
}: Props) => {
  const [isListOpen, setIsListOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(GetDefaultValue(type));

  useEffect(() => {
    if (aspect === Aspect.NotSet) {
      setSelectedValue(GetDefaultValue(type));
    }
  }, [aspect, type]);

  const toggleList = () => {
    setIsListOpen(!isListOpen);
  };

  const handleChange = ([key, value]) => {
    setSelectedValue(value);
    setIsListOpen(!isListOpen);
    onChange(key);
  };

  return (
    <DropdownMenuWrapper disabled={disabled}>
      <label htmlFor={label} />
      <div className="label"> {label}</div>
      <div onClick={disabled ? null : toggleList}>
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
