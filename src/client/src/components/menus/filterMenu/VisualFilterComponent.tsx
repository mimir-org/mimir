import * as selectors from "./helpers/selectors";
import { Connector, Relation, Terminal } from "@mimirorg/modelbuilder-types";
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
  const nodes = useAppSelector(selectors.nodesSelector);
  const edges = useAppSelector(selectors.edgesSelector);

  const transportTerminals = [] as Terminal[];
  const relationConnectors = [] as Relation[];
  const partOfConnectors = [] as Connector[];

  PopulateFilterLists(edges, nodes, transportTerminals, relationConnectors, partOfConnectors, isTreeView);

  return (
    <VisualFilterContainer libraryOpen={libOpen}>
      <VisualFilterHeader>{TextResources.VISUAL_FILTER}</VisualFilterHeader>
      <VisualFilterMenuColumn>
        <AnimationFilter isAnimated={edgeAnimation} visible={!!transportTerminals.length} dispatch={dispatch} />
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
        <TransportFilter edges={edges} terminals={transportTerminals} dispatch={dispatch} visible={!!transportTerminals.length} />
      </VisualFilterMenuColumn>
    </VisualFilterContainer>
  );
};
