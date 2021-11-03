import { useAppDispatch, useAppSelector } from "../../../../redux/store";
import { Connector } from "../../../../models";
import { FilterMenuBox, MenuColumn } from "../../../../compLibrary/box/menus";
import { IsLibrary } from "../../../flow/helpers";
import { FilterDropdown } from "../dropdown";
import { TextResources } from "../../../../assets/text";
import { OnAnimationChange, OnChange, OnAllTransportsChange } from "../handlers";
import { GetEdges, GetNodes, PopulateFilterLists } from "../helpers";
import { FilterElement } from "..";

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
  const transportLabel = TextResources.Relations_Transport;
  const relationLabel = TextResources.Relations;
  const partOfLabel = TextResources.Relations_PartOf_Relationship;

  PopulateFilterLists(edges, transportItems, relationItems, partOfItems);

  return (
    <FilterMenuBox libraryOpen={libOpen}>
      <MenuColumn>
        <FilterElement
          label={"Edge animation"}
          onChange={() => OnAnimationChange(edges, dispatch, edgeAnimation)}
          isChecked={edgeAnimation}
          visible={!!transportItems.length}
        />
        <FilterElement
          label={"Show all transport edges"}
          onChange={() => OnAllTransportsChange(edges, dispatch)}
          isChecked={!edges.some((x) => x.isHidden)}
          visible={!!transportItems.length}
        />
        <FilterDropdown
          terminals={transportItems}
          label={transportLabel}
          nodes={nodes}
          edges={edges}
          onChange={(edge) => OnChange(edge, edges, dispatch)}
          visible={!!transportItems.length}
        />
        <FilterDropdown
          terminals={relationItems}
          label={relationLabel}
          nodes={nodes}
          edges={edges}
          onChange={(edge) => OnChange(edge, edges, dispatch)}
          visible={!!relationItems.length}
        />
        <FilterDropdown
          terminals={partOfItems}
          label={partOfLabel}
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
