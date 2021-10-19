import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { Connector, Project } from "../../../models";
import { FilterMenuBox, MenuColumn } from "../../../compLibrary/box/menus";
import { IsFamily, IsLibrary, IsLocationTerminal, IsPartOfTerminal, IsTransportTerminal } from "../../flow/helpers";
import { FilterDropdown } from "./dropdown/";
import { TextResources } from "../../../assets/text";
import { IsBlockView } from "../../flow/block/helpers";
import { OnChange } from "./handlers";
import { GetConnectorNode } from "./helpers";

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

  const transportTerminals = [] as Connector[];
  const transportLabel = TextResources.Relations_Transport;
  const relationsTerminals = [] as Connector[];
  const relationsLabel = TextResources.Relations;
  const partOfTerminals = [] as Connector[];
  const partOfLabel = TextResources.Relations_PartOf_Relationship;

  edges.forEach((e) => {
    if (IsTransportTerminal(e.fromConnector)) {
      if (!transportTerminals.some((conn) => conn.terminalTypeId === e.fromConnector.terminalTypeId))
        transportTerminals.push(e.fromConnector);
    }
    if (IsLocationTerminal(e.fromConnector)) {
      if (!relationsTerminals.some((conn) => IsLocationTerminal(conn))) relationsTerminals.push(e.fromConnector);
    }
    if (IsPartOfTerminal(e.fromConnector)) {
      const sourceNode = GetConnectorNode(e.fromConnector);
      let exists = false;

      partOfTerminals.forEach((conn) => {
        let source = GetConnectorNode(conn);
        if (IsFamily(source, sourceNode)) exists = true;
      });

      if (!exists) partOfTerminals.push(e.fromConnector);
    }
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
