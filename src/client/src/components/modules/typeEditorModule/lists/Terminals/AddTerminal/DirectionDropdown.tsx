import { useState } from "react";
import {
  ExpandedIcon,
  CollapsedIcon,
} from "../../../../../../assets/icons/common";
import "./directiondropdown.scss";

export const DirectionDropdown = () => {
  const [isListOpen, setIsListOpen] = useState(false);
  const [selectedValue] = useState("Direction");

  const toggleList = () => {
    setIsListOpen(!isListOpen);
  };

  //   const handleChange = () => {
  //     // TODO: Se dropdownmenu
  //   };

  return (
    <div className="dropdown_container">
      <label htmlFor="direction" />
      <div onClick={toggleList}>
        <div className="dropdown_header">
          <p>{selectedValue}</p>
          <img
            src={isListOpen ? ExpandedIcon : CollapsedIcon}
            alt="expand-icon"
            onClick={toggleList}
          />
        </div>
      </div>
      {isListOpen && (
        <div className="dropdown_list">
          <div className="dropdown_listitem">Input</div>
          <div className="dropdown_listitem">Output</div>
        </div>
      )}
    </div>
  );
};

export default DirectionDropdown;
