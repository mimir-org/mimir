import { useAppDispatch, useAppSelector } from "../../../../redux/store";
import { Connector } from "../../../../models";
import { FilterMenuBox, MenuColumn } from "../../../../compLibrary/box/menus";
import { FilterElement } from "../";
import { IsLibrary } from "../../../flow/helpers";
import { FilterDropdown, FilterTerminalDropdown } from "../dropdown";
import { TextResources } from "../../../../assets/text";
import { OnAnimationChange, OnChange } from "../handlers";
import { GetActiveTerminals, GetAllTerminals, GetEdges, GetInactiveTerminals, GetNodes, PopulateFilterLists } from "../helpers";

interface Props {
  elements: any[];
  edgeAnimation: boolean;
}

/**
 * Menu to filter terminals and edges in BlockView.
 * @returns a menu with multiple drop-down menus.
 */
const BlockFilterMenu = ({ elements, edgeAnimation }: Props) => {
  const dispatch = useAppDispatch();
  const libOpen = useAppSelector((s) => s.modules.types.find((x) => IsLibrary(x.type)).visible);
  const edges = GetEdges(elements);
  const nodes = GetNodes(elements);

  const transportItems = [] as Connector[];
  const relationItems = [] as Connector[];
  const transportLabel = TextResources.Relations_Transport;
  const relationLabel = TextResources.Relations;
  const activeTerminals = GetActiveTerminals(elements, nodes);
  const inActiveTerminals = GetInactiveTerminals(nodes);
  const allTerminals = GetAllTerminals(elements);

  PopulateFilterLists(edges, transportItems, relationItems, []);

  return (
    <FilterMenuBox libraryOpen={libOpen}>
      <MenuColumn>
        <FilterElement
          label={"Animation"}
          onChange={() => OnAnimationChange(edges, dispatch, edgeAnimation)}
          isChecked={edgeAnimation}
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
        <FilterTerminalDropdown
          allTerminals={allTerminals}
          activeTerminals={activeTerminals}
          inActiveTerminals={inActiveTerminals}
          label={"Terminals"}
          dispatch={dispatch}
        />
      </MenuColumn>
    </FilterMenuBox>
  );
};

export default BlockFilterMenu;
