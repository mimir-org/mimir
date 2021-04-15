import textResources from "../../../textResources";
import { useState } from "react";
import { VisualFilterWrapper, IconWrapper, IconTextWrapper } from "./styled";
import {
  loadStateFromStorage,
  saveStateToStorage,
} from "../../../redux/store/localStorage/LocalStorage";

import {
  VisualFilterIconClosed,
  VisualFilterIconOpen,
} from "../../../assets/index";

const FilterModule = () => {
  const [showFilter, setShowFilter] = useState(loadStateFromStorage("filter"));
  const handleClick = (e) => {
    const key = e.target.alt;
    setShowFilter(!showFilter);
    saveStateToStorage(!showFilter, key);
  };
  const isOpen = loadStateFromStorage("filter");

  return (
    <>
      <IconTextWrapper isOpen={isOpen}>
        {textResources.MainHeader_VisualFilter}
      </IconTextWrapper>
      <IconWrapper>
        {isOpen ? (
          <img src={VisualFilterIconOpen} alt="filter" onClick={handleClick} />
        ) : (
          <img
            src={VisualFilterIconClosed}
            alt="filter"
            onClick={handleClick}
          />
        )}
      </IconWrapper>

      {isOpen && (
        <VisualFilterWrapper>{textResources.Filter_Types}</VisualFilterWrapper>
      )}
    </>
  );
};

export default FilterModule;
