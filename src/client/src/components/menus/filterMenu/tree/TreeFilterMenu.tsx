import { useAppDispatch, useAppSelector } from "../../../../redux/store";
import { Connector } from "../../../../models";
import { FilterMenuBox, MenuColumn } from "../../../../compLibrary/box/menus";
import { IsLibrary } from "../../../flow/helpers";
import { FilterDropdown } from "../dropdown";
import { TextResources } from "../../../../assets/text";
import { OnAnimationChange, OnChange } from "../handlers";
import { GetEdges, GetNodes, IsAnimationChecked, PopulateFilterLists } from "../helpers";
import { FilterElement } from "..";

interface Props {
  elements: any[];
}

/**
 * Menu to filter terminals and edges in TreeView.
 * @returns a menu with multiple drop-down menus
 */
const TreeFilterMenu = ({ elements }: Props) => {
  const dispatch = useAppDispatch();
  const libOpen = useAppSelector((s) => s.modules.types.find((x) => IsLibrary(x.type)).visible);
  const edges = GetEdges(elements);
  const nodes = GetNodes(elements);

  const transportItems = [] as Connector[];
  const relationItems = [] as Connector[];
  const partOfItems = [] as Connector[];
  const transportLabel = TextResources.Relations_Transport;
  const relationLabel = TextResources.Relations;
  const partOfLabel = TextResources.Relations_PartOf_Relationship;

  PopulateFilterLists(edges, transportItems, relationItems, partOfItems);

  return (
    <FilterMenuBox libraryOpen={libOpen}>
      <MenuColumn>
        <FilterElement
          label={"Animation"}
          onChange={() => OnAnimationChange(edges, dispatch)}
          isChecked={IsAnimationChecked(edges)}
        />
        <FilterDropdown
          terminals={transportItems}
          label={transportLabel}
          nodes={nodes}
          edges={edges}
          onChange={(edge) => OnChange(edge, edges, dispatch)}
        />
        <FilterDropdown
          terminals={relationItems}
          label={relationLabel}
          nodes={nodes}
          edges={edges}
          onChange={(edge) => OnChange(edge, edges, dispatch)}
        />
        <FilterDropdown
          terminals={partOfItems}
          label={partOfLabel}
          nodes={nodes}
          edges={edges}
          onChange={(edge) => OnChange(edge, edges, dispatch)}
        />
      </MenuColumn>
    </FilterMenuBox>
  );
};

export default TreeFilterMenu;
