import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { TypeEditorState } from "../../../../redux/store/typeEditor/types";
import { expandedIcon, unexpandedIcon } from "../../../../assets/icons/common";
import GetRightMargin from "../helper/GetRightMargin";
import {
  getRDS,
  changeSelectedAspect,
  changeSelectedObjecttype,
  changeStatus,
} from "../../../../redux/store/typeEditor/actions";
import {
  DropdownMenuWrapper,
  DropdownMenuHeader,
  DropdownMenuList,
  DropdownMenuListItem,
} from "../../../../componentLibrary/dropdown";
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

  const state = useSelector<RootState>(
    (state) => state.typeEditor
  ) as TypeEditorState;

  const toggleList = () => {
    setIsListOpen(!isListOpen);
  };

  const handleChange = (item) => {
    setSelectedValue(item);
    setIsListOpen(!isListOpen);
    if (label === "Aspect") {
      dispatch(changeSelectedAspect(item));
    } else if (label === "Object Type") {
      dispatch(changeSelectedObjecttype(item));
    } else if (label === "Status") {
      dispatch(changeStatus(item));
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
              src={isListOpen ? expandedIcon : unexpandedIcon}
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
                onClick={() => handleChange(value)}
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
