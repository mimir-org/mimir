import { Node as FlowNode, Edge as FlowEdge } from "react-flow-renderer";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { Connector } from "../../../models";
import { VisualFilterContainer, VisualFilterHeader, VisualFilterMenuColumn } from "./VisualFilterComponent.styled";
import { AnimationFilter, PartOfFilter, RelationFilter, TransportFilter } from "./components/filters";
import { TextResources } from "../../../assets/text/TextResources";
import { IsLibrary } from "../../../helpers";
import { GetMimirElements } from "./helpers/GetFilterElements";
import { PopulateFilterLists } from "./helpers/PopulateFilterLists";

interface Props {
  flowNodes: FlowNode[];
  flowEdges: FlowEdge[];
  edgeAnimation: boolean;
}

/**
 * Component for the Visual Filter.
 * @param interface
 * @returns a menu with multiple checkboxes to control visibility of items in Mimir.
 */
export const VisualFilterComponent = ({ flowNodes, flowEdges, edgeAnimation }: Props) => {
  const dispatch = useAppDispatch();
  const libOpen = useAppSelector((s) => s.modules.types.find((x) => IsLibrary(x.type)).visible);
  const { mimirNodes, mimirEdges } = GetMimirElements(flowNodes, flowEdges);

  const transportItems: Connector[] = [];
  const relationItems: Connector[] = [];
  const partOfItems: Connector[] = [];

  PopulateFilterLists(mimirEdges, transportItems, relationItems, partOfItems);

  return (
    <VisualFilterContainer libraryOpen={libOpen}>
      <VisualFilterHeader>{TextResources.FILTER_HEADING}</VisualFilterHeader>
      <VisualFilterMenuColumn>
        <AnimationFilter edgeAnimation={edgeAnimation} dispatch={dispatch} />
        <PartOfFilter
          edges={mimirEdges}
          nodes={mimirNodes}
          items={partOfItems}
          dispatch={dispatch}
          visible={!!partOfItems.length}
        />
        <RelationFilter edges={mimirEdges} items={relationItems} dispatch={dispatch} visible={!!relationItems.length} />
        <TransportFilter edges={mimirEdges} items={transportItems} dispatch={dispatch} visible={!!transportItems.length} />
      </VisualFilterMenuColumn>
    </VisualFilterContainer>
  );
};
