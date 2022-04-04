import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { Connector } from "../../../models";
import { VisualFilterContainer, VisualFilterHeader, VisualFilterMenuColumn } from "./VisualFilterComponent.styled";
import { AnimationFilter, PartOfFilter, RelationFilter, TransportFilter } from "./components/filters";
import { TextResources } from "../../../assets/text/TextResources";
import { IsLibrary } from "../../../helpers";
import { GetFilterElements } from "./helpers/GetFilterElements";
import { PopulateFilterLists } from "./helpers/PopulateFilterLists";
import { Elements } from "react-flow-renderer";

interface Props {
  elements: Elements;
  edgeAnimation: boolean;
}

/**
 * Component for the Visual Filter.
 * @param interface
 * @returns a menu with multiple checkboxes to control visibility of items in Mimir.
 */
export const VisualFilterComponent = ({ elements, edgeAnimation }: Props) => {
  const dispatch = useAppDispatch();
  const libOpen = useAppSelector((s) => s.modules.types.find((x) => IsLibrary(x.type)).visible);
  const { nodes, edges } = GetFilterElements(elements);

  const transportItems: Connector[] = [];
  const relationItems: Connector[] = [];
  const partOfItems: Connector[] = [];

  PopulateFilterLists(edges, transportItems, relationItems, partOfItems);

  return (
    <VisualFilterContainer libraryOpen={libOpen}>
      <VisualFilterHeader>{TextResources.FILTER_HEADING}</VisualFilterHeader>
      <VisualFilterMenuColumn>
        <AnimationFilter edgeAnimation={edgeAnimation} dispatch={dispatch} />
        <PartOfFilter edges={edges} nodes={nodes} items={partOfItems} dispatch={dispatch} visible={!!partOfItems.length} />
        <RelationFilter edges={edges} items={relationItems} dispatch={dispatch} visible={!!relationItems.length} />
        <TransportFilter edges={edges} items={transportItems} dispatch={dispatch} visible={!!transportItems.length} />
      </VisualFilterMenuColumn>
    </VisualFilterContainer>
  );
};
