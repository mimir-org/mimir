import { useState } from "react";
import { useDispatch } from "react-redux";
import { Aspect } from "../../models";
// import GetRightMargin from "../helper/GetRightMargin";
import { ExpandedIcon, CollapsedIcon } from "../../assets/icons/common";
// import { LocationTypeCategory, LocationSubType } from "../styled";
import {
  DropdownMenuWrapper,
  DropdownMenuHeader,
  DropdownMenuList,
  DropdownMenuListItem,
} from ".";

interface Props {
  label: string;
  items?: any[];
  keyProp: string;
  valueProp: string;
  valueImageProp?: string;
}

const Dropdown = ({
  label,
  items,
  keyProp,
  valueProp,
  valueImageProp,
}: Props) => {
  const [isListOpen, setIsListOpen] = useState(false);
  // const [selectedValue, setSelectedValue] = useState(placeHolder);

  const toggleList = () => {
    setIsListOpen(!isListOpen);
  };

  const image = (item: any) => {
    const source = "data:image/svg+xml;base64," + item[valueImageProp];
    return <img src={source} alt={item.name} />;
  };

  return (
    <>
      <DropdownMenuWrapper>
        <label htmlFor={label} />
        <div className="label"> {label}</div>
        <div onClick={toggleList}>
          <DropdownMenuHeader>
            <p>SELECTD VALUE</p>
            <img
              src={isListOpen ? ExpandedIcon : CollapsedIcon}
              alt="expand-icon"
              onClick={toggleList}
            />
          </DropdownMenuHeader>
        </div>
        {isListOpen && (
          <DropdownMenuList>
            {items &&
              items.map((item) => {
                return (
                  <DropdownMenuListItem key={item[keyProp]}>
                    {console.log(item)}
                    <p>
                      {image(item)}
                      {item.name}
                    </p>
                  </DropdownMenuListItem>
                );
              })}
          </DropdownMenuList>
        )}
      </DropdownMenuWrapper>
    </>
  );
};

export default Dropdown;
