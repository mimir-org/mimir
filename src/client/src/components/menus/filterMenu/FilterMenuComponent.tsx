import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { Connector } from "../../../models";
import { FilterMenuBox, Header } from "./styled";
import { MenuColumn } from "../styled";
import { AnimationFilter, MaterialFluidFilter, PartOfFilter, RelationFilter, TerminalsFilter } from ".";
import { TextResources } from "../../../assets/text";
import { IsBlockView, IsLibrary } from "../../../helpers";
import { GetActiveTerminals, GetAllTerminals, GetEdges, GetNodes, PopulateFilterLists } from "./helpers";

interface Props {
  elements: any[];
  edgeAnimation: boolean;
}

/**
 * Menu to filter terminals and edges.
 * @returns a menu with multiple drop-down menus.
 */
const FilterMenuComponent = ({ elements, edgeAnimation }: Props) => {
  const dispatch = useAppDispatch();
  const libOpen = useAppSelector((s) => s.modules.types.find((x) => IsLibrary(x.type)).visible);
  const edges = GetEdges(elements);
  const nodes = GetNodes(elements);

  const transportItems = [] as Connector[];
  const relationItems = [] as Connector[];
  const partOfItems = [] as Connector[];
  const fluidItems = [] as Connector[];

  const activeTerminals = GetActiveTerminals(elements, nodes);
  const allTerminals = GetAllTerminals(elements);

  PopulateFilterLists(edges, fluidItems, transportItems, relationItems, partOfItems);

  return (
    <FilterMenuBox libraryOpen={libOpen}>
      <Header>{TextResources.Filter_Heading}</Header>
      <MenuColumn>
        <AnimationFilter edges={edges} transportItems={transportItems} edgeAnimation={edgeAnimation} dispatch={dispatch} />
        <PartOfFilter edges={edges} nodes={nodes} partOfItems={partOfItems} dispatch={dispatch} />
        <RelationFilter edges={edges} relationItems={relationItems} dispatch={dispatch} />
        <MaterialFluidFilter edges={edges} fluidItems={fluidItems} dispatch={dispatch} />

        {IsBlockView() && <TerminalsFilter activeTerminals={activeTerminals} allTerminals={allTerminals} dispatch={dispatch} />}
      </MenuColumn>
    </FilterMenuBox>
  );
};

export default FilterMenuComponent;

/* <FilterDropdown
          terminals={transportItems}
          label={TextResources.Relations_Transport}
          nodes={nodes}
          edges={edges}
          onChange={(edge) => OnFilterChange(edge, edges, dispatch)}
          visible={!!transportItems.length}
        /> */
