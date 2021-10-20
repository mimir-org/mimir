import { useAppDispatch, useAppSelector } from "../../../../redux/store";
import { Connector, Project } from "../../../../models";
import { FilterMenuBox, MenuColumn } from "../../../../compLibrary/box/menus";
import { IsLibrary } from "../../../flow/helpers";
import { FilterDropdown } from "../dropdown";
import { TextResources } from "../../../../assets/text";
import { OnChange } from "../handlers";
import { PopulateFilterLists } from "../helpers";

/**
 * Menu to filter terminals and edges in TreeView.
 * @returns a menu with multiple drop-down menus
 */
const TreeFilterMenu = () => {
  const dispatch = useAppDispatch();
  const project = useAppSelector((s) => s.projectState.project) as Project;
  const libraryOpen = useAppSelector((s) => s.modules.types.find((x) => IsLibrary(x.type)).visible);
  const edges = project?.edges;
  const nodes = project?.nodes;

  const transportItems = [] as Connector[];
  const relationItems = [] as Connector[];
  const partOfItems = [] as Connector[];
  const transportLabel = TextResources.Relations_Transport;
  const relationLabel = TextResources.Relations;
  const partOfLabel = TextResources.Relations_PartOf_Relationship;

  PopulateFilterLists(edges, transportItems, relationItems, partOfItems);

  return (
    <FilterMenuBox libraryOpen={libraryOpen}>
      <MenuColumn>
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