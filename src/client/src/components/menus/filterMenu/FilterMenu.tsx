import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { Connector, Project } from "../../../models";
import { FilterMenuBox, MenuColumn } from "../../../compLibrary/box/menus";
import { IsLibrary, IsLocationTerminal, IsPartOfTerminal, IsTransportTerminal } from "../../flow/helpers";
import { FilterDropdown } from "./dropdown/";
import { TextResources } from "../../../assets/text";
import { IsBlockView } from "../../flow/block/helpers";
import { OnChange } from "./handlers";

/**
 * Menu to filter terminals and edges
 * @returns a menu with multiple drop-down menus
 */
const FilterMenu = () => {
  const dispatch = useAppDispatch();
  const project = useAppSelector((s) => s.projectState.project) as Project;
  const libraryOpen = useAppSelector((s) => s.modules.types.find((x) => IsLibrary(x.type)).visible);
  const edges = project?.edges;
  const nodes = project?.nodes;

  const transportTerminals = new Set<Connector>();
  const transportLabel = TextResources.Relations_Transport;
  const relationsTerminals = new Set<Connector>();
  const relationsLabel = TextResources.Relations;
  const partOfTerminals = new Set<Connector>();
  const partOfLabel = TextResources.Relations_PartOf_Relationship;

  edges.forEach((e) => {
    if (IsTransportTerminal(e.fromConnector)) transportTerminals.add(e.fromConnector);
    if (IsLocationTerminal(e.fromConnector)) relationsTerminals.add(e.fromConnector);
    if (IsPartOfTerminal(e.fromConnector)) partOfTerminals.add(e.fromConnector);
  });

  return (
    <FilterMenuBox libraryOpen={libraryOpen}>
      <MenuColumn>
        <FilterDropdown
          terminals={transportTerminals}
          label={transportLabel}
          nodes={nodes}
          edges={edges}
          onChange={(edge) => OnChange(edge, edges, dispatch)}
        />
        <FilterDropdown
          terminals={relationsTerminals}
          label={relationsLabel}
          nodes={nodes}
          edges={edges}
          onChange={(edge) => OnChange(edge, edges, dispatch)}
        />
        {!IsBlockView() && (
          <FilterDropdown
            terminals={partOfTerminals}
            label={partOfLabel}
            nodes={nodes}
            edges={edges}
            onChange={(edge) => OnChange(edge, edges, dispatch)}
          />
        )}
      </MenuColumn>
    </FilterMenuBox>
  );
};

export default FilterMenu;
