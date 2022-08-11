import * as selectors from "./helpers/selectors";
import { Relation, Terminal } from "@mimirorg/modelbuilder-types";
import { VisualFilterContainer, VisualFilterHeader, VisualFilterMenuColumn } from "./VisualFilterComponent.styled";
import { AnimationFilter, PartOfFilter, ProductAndLocationRelationFilter, TransportFilter } from "./components/filters";
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
  const productAndLocationRelations = [] as Relation[];
  const partOfRelations = [] as Relation[];

  PopulateFilterLists(edges, nodes, transportTerminals, productAndLocationRelations, partOfRelations, isTreeView);

  return (
    <VisualFilterContainer libraryOpen={libOpen}>
      <VisualFilterHeader>{TextResources.VISUAL_FILTER}</VisualFilterHeader>
      <VisualFilterMenuColumn>
        <AnimationFilter isAnimated={edgeAnimation} visible={!!transportTerminals.length} dispatch={dispatch} />
        <PartOfFilter
          edges={edges}
          nodes={nodes}
          relations={partOfRelations}
          dispatch={dispatch}
          visible={IsPartOfFilterVisible(isTreeView, partOfRelations, nodes, secondaryNode)}
        />
        <ProductAndLocationRelationFilter
          edges={edges}
          nodes={nodes}
          connectors={productAndLocationRelations}
          dispatch={dispatch}
          visible={IsRelationFilterVisible(isTreeView, isSplitView, productAndLocationRelations)}
        />
        <TransportFilter edges={edges} terminals={transportTerminals} dispatch={dispatch} visible={!!transportTerminals.length} />
      </VisualFilterMenuColumn>
    </VisualFilterContainer>
  );
};
