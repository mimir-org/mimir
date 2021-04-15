import {
  loadStateFromStorage,
  saveStateToStorage,
} from "../../../redux/store/localStorage/localStorage";
import textResources from "../../../textResources";
import { VisualFilterWrapper, IconWrapper, IconTextWrapper } from "./styled";
import { VisualFilterIcon } from "../../../assets/index";
import { useState } from "react";

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
      <IconTextWrapper>{textResources.MainHeader_VisualFilter}</IconTextWrapper>
      <IconWrapper>
        <img src={VisualFilterIcon} alt="filter" onClick={handleClick} />
      </IconWrapper>
      {isOpen && (
        <VisualFilterWrapper>{textResources.Filter_Types}</VisualFilterWrapper>
      )}
    </>
  );
};

export default FilterModule;
