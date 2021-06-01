import { useState } from "react";
import { expandedIcon, unexpandedIcon } from "../../../../assets/icons";
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
  const [isListOpen, setIsListOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(placeHolder);

  const toggleList = () => {
    setIsListOpen(!isListOpen);
  };

  const handleChange = (item) => {
    setSelectedValue(item);
    setIsListOpen(!isListOpen);
  };

  return (
    <>
      <DropdownMenuWrapper>
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
                {console.log(key, value)}
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
