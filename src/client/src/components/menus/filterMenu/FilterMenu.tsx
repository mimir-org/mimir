import { TextResources } from "../../../assets/textResources";
import { useState } from "react";
import { MENU_TYPE, RELATION_TYPE } from "../../../models/project";
import { GetMenuIcon } from "../../../assets/helpers/";
import { MenuBox, MenuMainHeader } from "../../../componentLibrary/box/menus";
import { FilterContent } from ".";

const FilterModule = () => {
  const type = MENU_TYPE.VISUAL_FILTER;
  const [showFilter, setShowFilter] = useState(false);

  const handleClick = () => {
    setShowFilter(!showFilter);
  };

  return (
    <>
      <MenuMainHeader isOpen={showFilter} right type="FilterMenu">
        <div className="text" onClick={handleClick}>
          {TextResources.MainHeader_VisualFilter}
        </div>
        <img
          src={GetMenuIcon(showFilter, type)}
          alt="icon"
          className="icon"
          onClick={handleClick}
        />
      </MenuMainHeader>
      {showFilter && (
        <MenuBox right>
          <FilterContent type={RELATION_TYPE.Transport} index={0} />
          <FilterContent type={RELATION_TYPE.HasLocation} index={1} />
        </MenuBox>
      )}
    </>
  );
};

export default FilterModule;
