import "./filter.scss";
import textResources from "../../../textResources";
import FilterContent from "./FilterContent";
import { useState } from "react";
import { VisualFilterWrapper, IconWrapper, IconTextWrapper } from "./styled";
import {
  LoadState,
  SaveState,
} from "../../../redux/store/localStorage/localStorage";
import {
  VisualFilterIconClosed,
  VisualFilterIconOpen,
} from "../../../assets/index";

const FilterModule = () => {
  const key = "filter";
  const [showFilter, setShowFilter] = useState(LoadState(key));

  const handleClick = () => {
    setShowFilter(!showFilter);
    SaveState(!showFilter, key);
  };
  const isOpen = LoadState(key);

  return (
    <>
      <IconTextWrapper isOpen={isOpen}>
        <div onClick={handleClick} style={{ cursor: "pointer" }}>
          {textResources.MainHeader_VisualFilter}
        </div>
      </IconTextWrapper>
      <IconWrapper>
        {isOpen ? (
          <img src={VisualFilterIconOpen} alt={key} onClick={handleClick} />
        ) : (
          <img src={VisualFilterIconClosed} alt={key} onClick={handleClick} />
        )}
      </IconWrapper>
      {isOpen && (
        <VisualFilterWrapper>
          {textResources.Filter_Types}
          <FilterContent />
        </VisualFilterWrapper>
      )}
    </>
  );
};

export default FilterModule;
