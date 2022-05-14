import { animatedEdgeSelector, edgesSelector, flowViewSelector, nodesSelector, useAppSelector } from "../../../redux/store";
import { Connector } from "../../../models";
import { VisualFilterContainer, VisualFilterHeader, VisualFilterMenuColumn } from "./VisualFilterComponent.styled";
import { AnimationFilter, PartOfFilter, RelationFilter, TransportFilter } from "./components/filters";
import { TextResources } from "../../../assets/text/TextResources";
import { IsLibrary } from "../../../helpers/Modules";
import { PopulateFilterLists } from "./helpers/PopulateFilterLists";
import { Dispatch } from "redux";
import { VIEW_TYPE } from "../../../models/project";

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
  const flowView = useAppSelector(flowViewSelector);
  const isTreeView = flowView === VIEW_TYPE.TREEVIEW;
  const nodes = useAppSelector(nodesSelector);
  const edges = useAppSelector(edgesSelector);

  const transportConnectors = [] as Connector[];
  const relationConnectors = [] as Connector[];
  const partOfConnectors = [] as Connector[];

  PopulateFilterLists(edges, nodes, transportConnectors, relationConnectors, partOfConnectors, isTreeView);

  return (
    <VisualFilterContainer libraryOpen={libOpen}>
      <VisualFilterHeader>{TextResources.VISUAL_FILTER}</VisualFilterHeader>
      <VisualFilterMenuColumn>
        <AnimationFilter isAnimated={edgeAnimation} visible={!!transportConnectors.length} dispatch={dispatch} />
        <PartOfFilter
          edges={edges}
          nodes={nodes}
          connectors={partOfConnectors}
          dispatch={dispatch}
          visible={!!partOfConnectors.length}
        />
        <RelationFilter
          edges={edges}
          nodes={nodes}
          connectors={relationConnectors}
          dispatch={dispatch}
          visible={!!relationConnectors.length}
        />
        <TransportFilter
          edges={edges}
          connectors={transportConnectors}
          dispatch={dispatch}
          visible={!!transportConnectors.length}
        />
      </VisualFilterMenuColumn>
    </VisualFilterContainer>
  );
};
