import { TextResources } from "../../../assets/textResources";
import FilterContent from "./FilterContent";
import { useState } from "react";
import { MODULE_TYPE } from "../../../models/project";
import GetIcon from "./helpers/GetIcon";
import { MenuBox, MenuTopHeader } from "../../../componentLibrary";
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
      <MenuTopHeader isOpen={isOpen} right>
        <div onClick={handleClick}>{TextResources.MainHeader_VisualFilter}</div>
        {GetIcon(isOpen, handleClick)}
      </MenuTopHeader>
      {isOpen && (
        <MenuBox right>
          <FilterContent />
        </MenuBox>
      )}
    </>
  );
};

export default FilterModule;
