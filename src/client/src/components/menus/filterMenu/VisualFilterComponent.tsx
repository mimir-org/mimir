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

  const transportConnectors = [] as Connector[];
  const relationConnectors = [] as Connector[];
  const partOfConnectors = [] as Connector[];

  PopulateFilterLists(mimirEdges, mimirNodes, transportConnectors, relationConnectors, partOfConnectors);

  return (
    <VisualFilterContainer libraryOpen={libOpen}>
      <VisualFilterHeader>{TextResources.VISUAL_FILTER}</VisualFilterHeader>
      <VisualFilterMenuColumn>
        <AnimationFilter isAnimated={edgeAnimation} dispatch={dispatch} />
        <PartOfFilter
          edges={mimirEdges}
          nodes={mimirNodes}
          connectors={partOfConnectors}
          dispatch={dispatch}
          visible={!!partOfConnectors.length}
        />
        <RelationFilter
          edges={mimirEdges}
          nodes={mimirNodes}
          connectors={relationConnectors}
          dispatch={dispatch}
          visible={!!relationConnectors.length}
        />
        <TransportFilter
          edges={mimirEdges}
          connectors={transportConnectors}
          dispatch={dispatch}
          visible={!!transportConnectors.length}
        />
      </VisualFilterMenuColumn>
    </VisualFilterContainer>
  );
};
