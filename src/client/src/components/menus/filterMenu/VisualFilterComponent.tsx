import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { Connector } from "../../../models";
import { FilterMenuBox, Header } from "./styled";
import { MenuColumn } from "../styled";
import { AnimationFilter, PartOfFilter, RelationFilter, TerminalsFilter, TransportFilter } from ".";
import { TextResources } from "../../../assets/text";
import { IsBlockView, IsLibrary } from "../../../helpers";
import { GetActiveTerminals, GetAllTerminals, GetFilterEdges, GetFilterNodes, PopulateFilterLists } from "./helpers";

interface Props {
  elements: any[];
  edgeAnimation: boolean;
}

/**
 * Component for the Visual Filter menu.
 * @returns a menu with multiple checkboxes to control visibility of items in Mimir.
 */
const VisualFilterComponent = ({ elements, edgeAnimation }: Props) => {
  const dispatch = useAppDispatch();
  const libOpen = useAppSelector((s) => s.modules.types.find((x) => IsLibrary(x.type)).visible);
  const edges = GetFilterEdges(elements);
  const nodes = GetFilterNodes(elements);

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
        <AnimationFilter edges={edges} edgeAnimation={edgeAnimation} dispatch={dispatch} />
        <PartOfFilter edges={edges} nodes={nodes} items={partOfItems} dispatch={dispatch} visible={!!partOfItems.length} />
        <RelationFilter edges={edges} items={relationItems} dispatch={dispatch} visible={!!relationItems.length} />
        <TransportFilter edges={edges} items={transportItems} dispatch={dispatch} visible={!!transportItems.length} />

        {IsBlockView() && <TerminalsFilter activeTerminals={activeTerminals} allTerminals={allTerminals} dispatch={dispatch} />}
      </MenuColumn>
    </FilterMenuBox>
  );
};

export default VisualFilterComponent;
