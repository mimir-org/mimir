import { useState } from "react";
import { useDispatch } from "react-redux";
import { ExpandedIcon, CollapsedIcon } from "../../../../assets/icons/common";
import GetRightMargin from "../helper/GetRightMargin";
import {
  changeSelectedAspect,
  changeSelectedObjecttype,
  changeStatus,
} from "../../../../redux/store/typeEditor/actions";
import {
  DropdownMenuWrapper,
  DropdownMenuHeader,
  DropdownMenuList,
  DropdownMenuListItem,
} from "../../../../compLibrary/dropdown";
import "./dropdownmenu.scss";

interface Props {
  label: string;
  placeHolder: string;
  listItems: any;
}

export const DropDownMenu = ({ label, placeHolder, listItems }: Props) => {
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
      dispatch(changeSelectedAspect(Number(key)));
    } else if (label === "Object Type") {
      dispatch(changeSelectedObjecttype(Number(key)));
    } else if (label === "Status") {
      dispatch(changeStatus(Number(key)));
    }
  };

  return (
    <>
      <DropdownMenuWrapper right={GetRightMargin(label)}>
        <label htmlFor={label} />
        {label}
        <div onClick={toggleList}>
          <DropdownMenuHeader>
            <p>{selectedValue}</p>
            <img
              src={isListOpen ? ExpandedIcon : CollapsedIcon}
              alt="expand-icon"
              onClick={toggleList}
            />
          </DropdownMenuHeader>
        </div>
        {isListOpen && (
          <DropdownMenuList>
            {listItems.map(([key, value]) => (
              <div
                className="listitem"
                key={key}
                onClick={() => handleChange([key, value])}
              >
                <DropdownMenuListItem>
                  <p>{value}</p>
                </DropdownMenuListItem>
              </div>
            ))}
          </DropdownMenuList>
        )}
      </DropdownMenuWrapper>
    </>
  );
};

export default DropDownMenu;
