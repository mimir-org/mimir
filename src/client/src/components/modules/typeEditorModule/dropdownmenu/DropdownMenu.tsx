import "./dropdownmenu.scss";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Aspect } from "../../../../models";
import { ExpandedIcon, CollapsedIcon } from "../../../../assets/icons/common";
import { LocationDropdown } from "./helpers";
import { IsLocation } from "../helpers";
import {
  DropdownMenuWrapper,
  DropdownMenuHeader,
  DropdownMenuList,
  DropdownMenuListItem,
} from "../../../../compLibrary/dropdown";
import {
  changeSelectedAspect,
  changeSelectedObjecttype,
  changeStatus,
} from "../../../../redux/store/typeEditor/actions";

interface Props {
  aspect?: Aspect;
  label: string;
  placeHolder: string;
  listItems: any;
}

export const DropDownMenu = ({
  aspect,
  label,
  placeHolder,
  listItems,
}: Props) => {
  const dispatch = useDispatch();
  const [isListOpen, setIsListOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(placeHolder);

  const toggleList = () => {
    setIsListOpen(!isListOpen);
  };

  const handleChange = ([key, value]) => {
    setSelectedValue(value);
    setIsListOpen(!isListOpen);
    if (label === "Aspect") {
      // TODO: fix
      dispatch(changeSelectedAspect(Number(key)));
    } else if (label === "Object Type") {
      dispatch(changeSelectedObjecttype(Number(key)));
    } else if (label === "Status") {
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
              listItems={listItems}
              setSelectedValue={setSelectedValue}
              setIsListOpen={setIsListOpen}
              isListOpen={isListOpen}
            ></LocationDropdown>
          ) : (
            listItems?.map(([key, value]) => (
              <div
                className="listitem"
                key={key}
                onClick={() => handleChange([key, value])}
              >
                <DropdownMenuListItem>
                  <p>{value} test</p>
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
