import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { Connector } from "../../../models";
import { FilterMenuBox, Header } from "./styled";
import { MenuColumn } from "../styled";
import { FilterElement } from ".";
import { FilterDropdown, FilterTerminalDropdown } from "./dropdown";
import { TextResources } from "../../../assets/text";
import { OnEdgeAnimationChange, OnAllTransportsChange, OnChange } from "./handlers";
import { GetActiveTerminals, GetAllTerminals, GetEdges, GetInactiveTerminals, GetNodes, PopulateFilterLists } from "./helpers";
import { IsLibrary } from "../../../helpers";
import { IsTransport } from "../../flow/helpers";

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
  const partOfItems = [] as Connector[];

  const activeTerminals = GetActiveTerminals(elements, nodes);
  const inActiveTerminals = GetInactiveTerminals(nodes);
  const allTerminals = GetAllTerminals(elements);

  PopulateFilterLists(edges, transportItems, relationItems, partOfItems);

  return (
    <FilterMenuBox libraryOpen={libOpen}>
      <Header>{TextResources.Filter_Heading}</Header>
      <MenuColumn>
        <FilterElement
          label={TextResources.Filter_Edge_Animation}
          onChange={() => OnEdgeAnimationChange(edges, dispatch, edgeAnimation)}
          isChecked={edgeAnimation}
          visible={!!transportItems.length}
        />
        <FilterElement
          label={TextResources.Filter_Show_Transport}
          onChange={() => OnAllTransportsChange(edges, dispatch)}
          isChecked={!edges.some((x) => x.isHidden && IsTransport(x.fromConnector))}
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
        <FilterTerminalDropdown
          allTerminals={allTerminals}
          activeTerminals={activeTerminals}
          inActiveTerminals={inActiveTerminals}
          label={TextResources.Filter_Terminals}
          dispatch={dispatch}
        />
      </MenuColumn>
    </FilterMenuBox>
  );
};

export default BlockFilterMenu;
