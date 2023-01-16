import * as selectors from "./helpers/selectors";
import { Relation, Terminal } from "@mimirorg/modelbuilder-types";
import { VisualFilterContainer, VisualFilterHeader, VisualFilterMenuColumn } from "./VisualFilterComponent.styled";
import { TextResources } from "../../../assets/text/TextResources";
import { IsLibrary } from "../../../helpers/Modules";
import { PopulateFilterLists, ArePartOfRelationsVisible, AreProductAndLocationRelationsVisible } from "./helpers";
import { Dispatch } from "redux";
import { VIEW_TYPE } from "../../../models/project";
import { librarySelector, useAppSelector } from "../../../redux/store";
import {
  AnimationFilter,
  PartOfRelationsFilter,
  ProductAndLocationRelationsFilter,
  TransportTerminalsFilter,
} from "./components/filters";
import { defaultFilter, VisualFilterDataItem, VisualFilterData } from "../../../models/application/VisualFilter";
import { useEffect } from "react";
import { FilterElement } from "./components/FilterElement";
import { VisualFilterDataCategoryComponent } from "./VisualFilterDataCategoryComponent";
import { TransportLibCm } from "@mimirorg/typelibrary-types";
import { updateProjectDescription } from "../../../redux/store/project/actions";
import { toggleEdgeAnimation } from "../../../redux/store/edgeAnimation/edgeAnimationSlice";

interface Props {
  dispatch: Dispatch;
  filter: VisualFilterData;
  onFilterChange: (filter: VisualFilterData) => void;
}

/**
 * Component for the Visual Filter.
 * @returns a menu with multiple checkboxes to control visibility of items in Mimir.
 */
export const VisualFilterComponent = ({ dispatch, filter, onFilterChange }: Props) => {
  const library = useAppSelector(librarySelector);

  const libOpen = useAppSelector((s) => s.modules.types.find((x) => IsLibrary(x.type)).visible);
  const edgeAnimation = useAppSelector(selectors.animatedEdgeSelector);
  const flowView = useAppSelector(selectors.flowViewSelector);
  const secondaryNode = useAppSelector(selectors.secondaryNodeSelector);
  const isTreeView = flowView === VIEW_TYPE.TREEVIEW;
  const isSplitView = secondaryNode != null;
  const nodes = useAppSelector(selectors.nodesSelector);
  const edges = useAppSelector(selectors.edgesSelector);
  const project = useAppSelector(selectors.projectSelector);

  const transportTerminals = [] as Terminal[];
  const productAndLocationRelations = [] as Relation[];
  const partOfRelations = [] as Relation[];

  PopulateFilterLists(edges, nodes, transportTerminals, productAndLocationRelations, partOfRelations);

  // onChange: () => void;
  // isChecked: boolean;
  // visible: boolean;
  // label: string;
  // isHeader?: boolean;
  // isSubHeader?: boolean;
  // indent?: number;

  const onChange = (category, item) => {
    if (item == null) {
      const filterCopy = { ...filter };
      filterCopy.filters = filter.filters.map((cat) => {
        if (cat.id === category) {
          const itemsCopy = cat.items.map((i) => {
            return { ...i, checked: !cat.checked };
          });
          return { ...cat, items: itemsCopy, checked: !cat.checked };
        } else {
          return cat;
        }
      });
      onFilterChange(filterCopy);
      // dispatch(toggleEdgeAnimation());
    } else {
      const filterCopy = { ...filter };
      filterCopy.filters = filter.filters.map((cat) => {
        if (cat.id === category) {
          const itemsCopy = cat.items.map((i) => {
            if (i.id === item) {
              return { ...i, checked: !i.checked };
            } else {
              return i;
            }
          });
          return { ...cat, items: itemsCopy };
        } else {
          return cat;
        }
      });
      onFilterChange(filterCopy);
      // dispatch(toggleEdgeAnimation());
    }
  };

  return (
    <>
      {filter && filter.filters && (
        <VisualFilterContainer libraryOpen={libOpen}>
          <VisualFilterHeader>{TextResources.VISUAL_FILTER}</VisualFilterHeader>
          <VisualFilterMenuColumn>
            {filter.filters.map((category) => (
              <VisualFilterDataCategoryComponent key={category.id} category={category} onChange={onChange} />
            ))}
          </VisualFilterMenuColumn>
        </VisualFilterContainer>
      )}
    </>
  );
};
