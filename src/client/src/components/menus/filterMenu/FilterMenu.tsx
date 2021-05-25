import { TextResources } from "../../../assets/textResources";
import { useState } from "react";
import { MENU_TYPE, RELATION_TYPE } from "../../../models/project";
import { GetMenuIcon } from "../../../assets/helpers/";
import { MenuBox, MenuTopHeader } from "../../../componentLibrary/box/menus";
import { LoadState, SaveState } from "../../../redux/store/localStorage";
import { FilterContent } from ".";

const FilterModule = () => {
  const type = MENU_TYPE.VISUAL_FILTER;
  const [showFilter, setShowFilter] = useState(LoadState(type));

  const handleClick = () => {
    setShowFilter(!showFilter);
    SaveState(!showFilter, type);
  };

  return (
    <>
      <MenuTopHeader isOpen={showFilter} right>
        <div onClick={handleClick}>{TextResources.MainHeader_VisualFilter}</div>
        <img
          src={GetMenuIcon(showFilter, type)}
          alt="icon"
          className="icon"
          onClick={handleClick}
        />
      </MenuTopHeader>
      {showFilter && (
        <MenuBox right>
          <FilterContent type={RELATION_TYPE.Transport} />
          <FilterContent type={RELATION_TYPE.HasLocation} />
        </MenuBox>
      )}
    </>
  );
};

export default FilterModule;
