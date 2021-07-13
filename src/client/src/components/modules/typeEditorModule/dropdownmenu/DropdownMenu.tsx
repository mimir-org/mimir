import "./dropdownmenu.scss";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Aspect, ObjectType, Status } from "../../../../models";
import { ExpandedIcon, CollapsedIcon } from "../../../../assets/icons/common";
import { GetDefaultValue, LocationDropdown } from "./helpers";
import { IsLocation } from "../helpers";
import {
  DropdownMenuWrapper,
  DropdownMenuHeader,
  DropdownMenuList,
  DropdownMenuListItem,
} from "../../../../compLibrary/dropdown";
import {
  changeSelectedAspect,
  changeSelectedObjectType,
  changeStatus,
} from "../../../../redux/store/typeEditor/actions";

interface Props {
  aspect?: Aspect;
  label: string;
  items: any[];
  type: Aspect | ObjectType | Status;
}

export const DropDownMenu = ({ aspect, label, items, type }: Props) => {
  console.log(aspect);
  const dispatch = useDispatch();
  const [isListOpen, setIsListOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(GetDefaultValue(type));

  const toggleList = () => {
    setIsListOpen(!isListOpen);
  };

  const onChange = ([key, value]) => {
    setSelectedValue(value);
    setIsListOpen(!isListOpen);
    if (type === Aspect.NotSet) {
      dispatch(changeSelectedAspect(Number(key)));
    } else if (type === ObjectType.NotSet) {
      dispatch(changeSelectedObjectType(Number(key)));
    } else if (type === Status.Draft) {
      dispatch(changeStatus(Number(key)));
    }
    toggleList();
  };

  return (
    <DropdownMenuWrapper>
      <label htmlFor={label} />
      <div className="label"> {label}</div>
      <div onClick={toggleList}>
        <DropdownMenuHeader>
          <p>{selectedValue}</p>
          <img
            src={isListOpen ? ExpandedIcon : CollapsedIcon}
            alt="expand-icon"
          />
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
                onClick={() => onChange([key, value])}
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
