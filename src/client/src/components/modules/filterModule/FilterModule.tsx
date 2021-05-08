import textResources from "../../../textResources";
import FilterContent from "./FilterContent";
import { useState } from "react";
import { MODULE_TYPE } from "../../../models/project";
import GetIcon from "./helpers/GetIcon";
import { MenuBox, MenuHeader } from "../../../componentLibrary";
import {
  LoadState,
  SaveState,
} from "../../../redux/store/localStorage/localStorage";

const FilterModule = () => {
  const key = MODULE_TYPE.VISUAL_FILTER;
  const [showFilter, setShowFilter] = useState(LoadState(key));

  const handleClick = () => {
    setShowFilter(!showFilter);
    SaveState(!showFilter, key);
  };
  const isOpen = LoadState(key);

  return (
    <>
      <MenuHeader isOpen={isOpen}>
        <div onClick={handleClick}>{textResources.MainHeader_VisualFilter}</div>
        {GetIcon(isOpen, handleClick)}
      </MenuHeader>
      {isOpen && (
        <MenuBox>
          <FilterContent />
        </MenuBox>
      )}
    </>
  );
};

export default FilterModule;
