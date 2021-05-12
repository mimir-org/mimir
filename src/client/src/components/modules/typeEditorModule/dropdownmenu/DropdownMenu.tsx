import { useState } from "react";
import { useDispatch } from "react-redux";
import { expandedIcon, unexpandedIcon } from "../../../../assets/icons";
import {
  DropdownMenuWrapper,
  DropdownMenuHeader,
  DropdownMenuList,
  DropdownMenuListItem,
} from "../../../../componentLibrary/dropdown";

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
            {listItems.map((item) => (
              <div key={item.id} onClick={() => handleChange(item.name)}>
                <DropdownMenuListItem>
                  <p>{item.name}</p>
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
