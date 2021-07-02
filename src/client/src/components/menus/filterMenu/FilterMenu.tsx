import { FilterContent } from ".";
import { RelationType } from "../../../models";
import { MenuBox, MenuColumn } from "../../../compLibrary/box/menus";

const FilterMenu = () => {
  return (
    <MenuBox right>
      <MenuColumn>
        <FilterContent type={RelationType.PartOf} index={0} />
        <FilterContent type={RelationType.HasLocation} index={1} />
      </MenuColumn>
      <MenuColumn>
        <FilterContent type={"Transport"} index={2} />
        <FilterContent type={"Hide all"} index={3} />
      </MenuColumn>
    </MenuBox>
  );
};

export default FilterMenu;
