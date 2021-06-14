import { TextResources } from "../../../assets/textResources";
import { useState } from "react";
import { MENU_TYPE, RELATION_TYPE, TERMINAL } from "../../../models/project";
import { GetMenuIcon } from "../../../assets/helpers/";
import { FilterContent } from ".";
import {
  MenuBox,
  MenuColumn,
  MenuMainHeader,
  MenuSubHeader,
} from "../../../componentLibrary/box/menus";

const FilterModule = () => {
  const type = MENU_TYPE.VISUAL_FILTER;
  const [showFilter, setShowFilter] = useState(false);

  const handleClick = () => {
    setShowFilter(!showFilter);
  };

  return (
    <>
      <MenuMainHeader isOpen={showFilter} right type={type} id="FilterHeader">
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
        <MenuBox right id={type}>
          <MenuColumn>
            <MenuSubHeader>{TextResources.Filter_Other}</MenuSubHeader>
            <FilterContent type={RELATION_TYPE.Transport} index={0} />
            <FilterContent type={RELATION_TYPE.HasLocation} index={1} />
          </MenuColumn>
          <MenuColumn>
            <FilterContent type={TERMINAL.Gas} index={2} />
            <FilterContent type={TERMINAL.Water} index={3} />
          </MenuColumn>
        </MenuBox>
      )}
    </>
  );
};

export default FilterModule;
