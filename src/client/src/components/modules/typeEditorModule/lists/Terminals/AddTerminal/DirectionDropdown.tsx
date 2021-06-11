import { useState } from "react";
import {
  expandedIcon,
  unexpandedIcon,
} from "../../../../../../assets/icons/common";
import "./directiondropdown.scss";

export const DirectionDropdown = () => {
  const [isListOpen, setIsListOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("Direction");

  const toggleList = () => {
    setIsListOpen(!isListOpen);
  };

  const handleChange = () => {
    // TODO: Se dropdownmenu
  };

  return (
    <div className="dropdown_container">
      <label htmlFor="direction" />
      <div onClick={toggleList}>
        <div className="dropdown_header">
          <p>{selectedValue}</p>
          <img
            src={isListOpen ? expandedIcon : unexpandedIcon}
            alt="expand-icon"
            onClick={toggleList}
          />
        </div>
      </div>
      {isListOpen && (
        <div className="dropdown_list">
          <div className="dropdown_listitem">input</div>
          <div className="dropdown_listitem">output</div>
        </div>
      )}
    </div>
  );
};

export default DirectionDropdown;
