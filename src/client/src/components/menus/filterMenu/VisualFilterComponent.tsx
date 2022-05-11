import { useReactFlow } from "react-flow-renderer";
import { animatedEdgeSelector, useAppSelector } from "../../../redux/store";
import { Connector } from "../../../models";
import { VisualFilterContainer, VisualFilterHeader, VisualFilterMenuColumn } from "./VisualFilterComponent.styled";
import { AnimationFilter, PartOfFilter, RelationFilter, TransportFilter } from "./components/filters";
import { TextResources } from "../../../assets/text/TextResources";
import { IsLibrary } from "../../../helpers/Modules";
import { ConvertFlowElements } from "./helpers/ConvertFlowElements";
import { PopulateFilterLists } from "./helpers/PopulateFilterLists";
import { Dispatch } from "redux";

interface Props {
  dispatch: Dispatch;
}

/**
 * Component for the Visual Filter.
 * @returns a menu with multiple checkboxes to control visibility of items in Mimir.
 */
export const VisualFilterComponent = ({ dispatch }: Props) => {
  const libOpen = useAppSelector((s) => s.modules.types.find((x) => IsLibrary(x.type)).visible);
  const edgeAnimation = useAppSelector(animatedEdgeSelector);
  const flowNodes = useReactFlow().getNodes();
  const flowEdges = useReactFlow().getEdges();
  const { mimirNodes, mimirEdges } = ConvertFlowElements(flowNodes, flowEdges);

  const transportItems: Connector[] = [];
  const relationItems: Connector[] = [];
  const partOfItems: Connector[] = [];

  PopulateFilterLists(mimirEdges, mimirNodes, transportItems, relationItems, partOfItems);

  return (
    <VisualFilterContainer libraryOpen={libOpen}>
      <VisualFilterHeader>{TextResources.VISUAL_FILTER}</VisualFilterHeader>
      <VisualFilterMenuColumn>
        <AnimationFilter isAnimated={edgeAnimation} dispatch={dispatch} />
        <PartOfFilter
          edges={mimirEdges}
          nodes={mimirNodes}
          items={partOfItems}
          dispatch={dispatch}
          visible={!!partOfItems.length}
        />
        <RelationFilter
          edges={mimirEdges}
          nodes={mimirNodes}
          items={relationItems}
          dispatch={dispatch}
          visible={!!relationItems.length}
        />
        <TransportFilter edges={mimirEdges} items={transportItems} dispatch={dispatch} visible={!!transportItems.length} />
      </VisualFilterMenuColumn>
    </VisualFilterContainer>
  );
};
