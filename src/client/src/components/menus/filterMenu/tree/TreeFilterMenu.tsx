import { useAppDispatch, useAppSelector } from "../../../../redux/store";
import { Connector } from "../../../../models";
import { FilterMenuBox, MenuColumn } from "../../../../compLibrary/box/menus";
import { FilterDropdown } from "../dropdown";
import { TextResources } from "../../../../assets/text";
import { OnAnimationChange, OnChange, OnAllTransportsChange } from "../handlers";
import { GetEdges, GetNodes, PopulateFilterLists } from "../helpers";
import { FilterElement } from "..";
import { IsLibrary } from "../../../../helpers";

interface Props {
  elements: any[];
  edgeAnimation: boolean;
}

/**
 * Menu to filter terminals and edges in TreeView.
 * @returns a menu with multiple drop-down menus
 */
const TreeFilterMenu = ({ elements, edgeAnimation }: Props) => {
  const dispatch = useAppDispatch();
  const libOpen = useAppSelector((s) => s.modules.types.find((x) => IsLibrary(x.type)).visible);
  const edges = GetEdges(elements);
  const nodes = GetNodes(elements);

  const transportItems = [] as Connector[];
  const relationItems = [] as Connector[];
  const partOfItems = [] as Connector[];

  PopulateFilterLists(edges, transportItems, relationItems, partOfItems);

  return (
    <FilterMenuBox libraryOpen={libOpen}>
      <MenuColumn>
        <FilterElement
          label={TextResources.Filter_Edge_Animation}
          onChange={() => OnAnimationChange(edges, dispatch, edgeAnimation)}
          isChecked={edgeAnimation}
          visible={!!transportItems.length}
        />
        <FilterElement
          label={TextResources.Filter_Show_Transport}
          onChange={() => OnAllTransportsChange(edges, dispatch)}
          isChecked={!edges.some((x) => x.isHidden)}
          visible={!!transportItems.length}
        />
        <FilterDropdown
          terminals={transportItems}
          label={TextResources.Relations_Transport}
          nodes={nodes}
          edges={edges}
          onChange={(edge) => OnChange(edge, edges, dispatch)}
          visible={!!transportItems.length}
        />
        <FilterDropdown
          terminals={relationItems}
          label={TextResources.Relations}
          nodes={nodes}
          edges={edges}
          onChange={(edge) => OnChange(edge, edges, dispatch)}
          visible={!!relationItems.length}
        />
        <FilterDropdown
          terminals={partOfItems}
          label={TextResources.Relations_PartOf_Relationship}
          nodes={nodes}
          edges={edges}
          onChange={(edge) => OnChange(edge, edges, dispatch)}
          visible={!!partOfItems.length}
        />
      </MenuColumn>
    </FilterMenuBox>
  );
};

export default TreeFilterMenu;
