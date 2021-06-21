import { useState } from "react";
import {
  ExpandedIcon,
  CollapsedIcon,
} from "../../../../../../assets/icons/common";
import "./directiondropdown.scss";
import { ConnectorType } from "../../../../../../models";

export const DirectionDropdown = () => {
  const [isListOpen, setIsListOpen] = useState(false);
  const [selectedValue] = useState("Direction");

  const toggleList = () => {
    setIsListOpen(!isListOpen);
  };

  const StringIsNumber = (value) => isNaN(Number(value)) === false;

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
          {Object.keys(ConnectorType)
            .filter(StringIsNumber)
            .map((item) => {
              return (
                <div className="dropdown_listitem">
                  {ConnectorType[item]} {item}
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default DirectionDropdown;
