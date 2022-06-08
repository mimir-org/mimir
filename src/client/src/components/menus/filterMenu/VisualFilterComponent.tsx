import * as selectors from "./helpers/selectors";
import { Node, Connector } from "@mimirorg/modelbuilder-types";
import { VisualFilterContainer, VisualFilterHeader, VisualFilterMenuColumn } from "./VisualFilterComponent.styled";
import { AnimationFilter, PartOfFilter, RelationFilter, TransportFilter } from "./components/filters";
import { TextResources } from "../../../assets/text/TextResources";
import { IsLibrary } from "../../../helpers/Modules";
import { PopulateFilterLists, IsPartOfFilterVisible, IsRelationFilterVisible } from "./helpers/";
import { Dispatch } from "redux";
import { VIEW_TYPE } from "../../../models/project";
import { useAppSelector } from "../../../redux/store";

interface Props {
  dispatch: Dispatch;
}

/**
 * Component for the Visual Filter.
 * @returns a menu with multiple checkboxes to control visibility of items in Mimir.
 */
export const VisualFilterComponent = ({ dispatch }: Props) => {
  const libOpen = useAppSelector((s) => s.modules.types.find((x) => IsLibrary(x.type)).visible);
  const edgeAnimation = useAppSelector(selectors.animatedEdgeSelector);
  const flowView = useAppSelector(selectors.flowViewSelector);
  const secondaryNode = useAppSelector(selectors.secondaryNodeSelector);
  const isTreeView = flowView === VIEW_TYPE.TREEVIEW;
  const isSplitView = secondaryNode != null;
  const nodes = useAppSelector(selectors.nodesSelector) as Node[];
  const edges = useAppSelector(selectors.edgesSelector);

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
          visible={IsPartOfFilterVisible(isTreeView, partOfConnectors, nodes, secondaryNode)}
        />
        <RelationFilter
          edges={edges}
          nodes={nodes}
          connectors={relationConnectors}
          dispatch={dispatch}
          visible={IsRelationFilterVisible(isTreeView, isSplitView, relationConnectors)}
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
