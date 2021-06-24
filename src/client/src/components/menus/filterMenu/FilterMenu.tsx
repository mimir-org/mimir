import { TextResources } from "../../../assets/textResources";
import { useState } from "react";
import { MENU_TYPE } from "../../../models/project";
import { GetMenuIcon } from "../../../assets/helpers/";
import { FilterContent } from ".";
import { RelationType } from "../../../models";
import {
  MenuBox,
  MenuColumn,
  MenuMainHeader,
} from "../../../compLibrary/box/menus";

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
        <MenuBox right>
          <MenuColumn>
            <FilterContent type={RelationType.PartOf} index={0} />
            <FilterContent type={RelationType.HasLocation} index={1} />
          </MenuColumn>
          <MenuColumn>
            <FilterContent type={null} index={2} />
            <FilterContent type={RelationType.HasLocation} index={3} />
          </MenuColumn>
        </MenuBox>
      )}
    </>
  );
};

export default FilterModule;
