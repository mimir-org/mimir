// import { Relation, Terminal } from "@mimirorg/modelbuilder-types";
import { VisualFilterContainer, VisualFilterHeader, VisualFilterMenuColumn } from "./VisualFilterComponent.styled";
import { TextResources } from "../../../assets/text/TextResources";
import { IsLibrary } from "../../../helpers/Modules";
import { PopulateFilterLists } from "./helpers";
import { projectStateSelector, useAppSelector } from "store";
import { VisualFilterData } from "../../../models/application/VisualFilter";
import { VisualFilterDataCategoryComponent } from "./VisualFilterDataCategoryComponent";
import { ConnectorPartOf, ConnectorRelation, ConnectorTerminal } from "lib";
import { ProjectState } from "store/reducers/projectReducer";

interface Props {
  filter: VisualFilterData;
  onFilterChange: (filter: VisualFilterData) => void;
}

/**
 * Component for the Visual Filter.
 * @returns a menu with multiple checkboxes to control visibility of items in Mimir.
 */
export const VisualFilterComponent = ({ filter, onFilterChange }: Props) => {
  const libOpen = false; //useAppSelector((s) => s.modules.types.find((x) => IsLibrary(x.type)).visible);
  const projectSelector = useAppSelector<ProjectState>(projectStateSelector);

  const nodes = projectSelector.project.blocks; // useAppSelector(selectors.nodesSelector);
  const edges = projectSelector.project.connections; //useAppSelector(selectors.edgesSelector);

  const transportTerminals = [] as ConnectorTerminal[];
  const productAndLocationRelations = [] as ConnectorRelation[];
  const partOfRelations = [] as ConnectorPartOf[];

  PopulateFilterLists(edges, nodes, transportTerminals, productAndLocationRelations, partOfRelations);

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
