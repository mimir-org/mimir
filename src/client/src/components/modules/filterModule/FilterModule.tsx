import "./filter.scss";
import textResources from "../../../textResources";
import FilterContent from "./FilterContent";
import { useState } from "react";
import { VisualFilterWrapper, IconWrapper, IconTextWrapper } from "./styled";
import {
  loadStateFromStorage,
  saveStateToStorage,
} from "../../../redux/store/localStorage/localStorage";
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
      <div
        className={"clickable_field " + (isOpen && "isOpen")}
        onClick={handleClick}
      >
        {isOpen ? (
          <img
            src={VisualFilterIconOpen}
            alt="filter"
            className="filter_icon"
          />
        ) : (
          <img
            src={VisualFilterIconClosed}
            alt="filter"
            className="filter_icon"
          />
        )}
        <p>{textResources.MainHeader_VisualFilter}</p>
      </div>
      {isOpen && (
        <VisualFilterWrapper>
          <FilterContent />
        </VisualFilterWrapper>
      )}
    </>
  );
};

export default FilterModule;
