import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { Connector, Edge, Node } from "../../../models";
import { FilterMenuBox, Header } from "./styled";
import { MenuColumn } from "../styled";
import { AnimationFilter, PartOfFilter, RelationFilter, TransportFilter } from "./filters";
import { TextResources } from "../../../assets/text";
import { IsLibrary } from "../../../helpers";
import { GetFilterElements, PopulateFilterLists } from "./helpers";
import { memo } from "react";
import { Elements } from "react-flow-renderer";

interface Props {
  elements: Elements<Node | Edge>;
  edgeAnimation: boolean;
}

/**
 * Component for the Visual Filter.
 * @param interface
 * @returns a menu with multiple checkboxes to control visibility of items in Mimir.
 */
const VisualFilterComponent = ({ elements, edgeAnimation }: Props) => {
  const dispatch = useAppDispatch();
  const libOpen = useAppSelector((s) => s.modules.types.find((x) => IsLibrary(x.type)).visible);
  const filterElements = GetFilterElements(elements);

  const nodes = filterElements[0] as Node[];
  const edges = filterElements[1] as Edge[];

  const transportItems = [] as Connector[];
  const relationItems = [] as Connector[];
  const partOfItems = [] as Connector[];

  PopulateFilterLists(edges, transportItems, relationItems, partOfItems);

  return (
    <FilterMenuBox libraryOpen={libOpen}>
      <Header>{TextResources.Filter_Heading}</Header>
      <MenuColumn>
        <AnimationFilter edgeAnimation={edgeAnimation} dispatch={dispatch} />
        <PartOfFilter edges={edges} nodes={nodes} items={partOfItems} dispatch={dispatch} visible={!!partOfItems.length} />
        <RelationFilter edges={edges} items={relationItems} dispatch={dispatch} visible={!!relationItems.length} />
        <TransportFilter edges={edges} items={transportItems} dispatch={dispatch} visible={!!transportItems.length} />
      </MenuColumn>
    </FilterMenuBox>
  );
};

export default memo(VisualFilterComponent);
