import { VisualFilterContainer, VisualFilterHeader, VisualFilterMenuColumn } from "./VisualFilterComponent.styled";
import { TextResources } from "../../../assets/text/TextResources";
import { VisualFilterData } from "../../../lib/models/application/VisualFilter";
import { VisualFilterDataCategoryComponent } from "./VisualFilterDataCategoryComponent";
import { useState } from "react";

interface Props {
  filter: VisualFilterData;
  onFilterChange: (filter: VisualFilterData) => void;
}

/**
 * Component for the Visual Filter.
 * @returns a menu with multiple checkboxes to control visibility of items in Mimir.
 */
export const VisualFilterComponent = ({ filter, onFilterChange }: Props) => {
  const [libOpen, setLibOpen] = useState<boolean>(true);

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
