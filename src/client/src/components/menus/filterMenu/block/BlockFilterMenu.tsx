import { useAppDispatch, useAppSelector } from "../../../../redux/store";
import { Connector, Project } from "../../../../models";
import { FilterMenuBox, MenuColumn } from "../../../../compLibrary/box/menus";
import { IsLibrary } from "../../../flow/helpers";
import { FilterDropdown, FilterTerminalDropdown } from "../dropdown";
import { TextResources } from "../../../../assets/text";
import { OnChange, OnTerminalChange } from "../handlers";
import { GetTerminals, PopulateFilterLists } from "../helpers";

/**
 * Menu to filter terminals and edges in BlockView.
 * @returns a menu with multiple drop-down menus.
 */
const BlockFilterMenu = () => {
  const dispatch = useAppDispatch();
  const project = useAppSelector((s) => s.projectState.project) as Project;
  const libraryOpen = useAppSelector((s) => s.modules.types.find((x) => IsLibrary(x.type)).visible);
  const edges = project?.edges;
  const nodes = project?.nodes;

  const transportItems = [] as Connector[];
  const relationItems = [] as Connector[];
  const transportLabel = TextResources.Relations_Transport;
  const relationLabel = TextResources.Relations;
  const activeTerminals = GetTerminals(nodes);

  PopulateFilterLists(edges, transportItems, relationItems, []);

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
        <FilterTerminalDropdown
          terminals={activeTerminals}
          label={"Terminals"}
          nodes={nodes}
          onChange={() => OnTerminalChange(activeTerminals, dispatch)}
        />
      </MenuColumn>
    </FilterMenuBox>
  );
};

export default BlockFilterMenu;