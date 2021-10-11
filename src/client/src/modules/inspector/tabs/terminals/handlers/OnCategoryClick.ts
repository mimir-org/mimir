import { TerminalCategory } from "../../../../../typeEditor/helpers/GetFilteredTerminalsList";

export const OnCategoryClick = (
  category: TerminalCategory,
  expanded: boolean,
  selectedCategoriesIds: string[],
  setSelectedCategoriesIds: (categoryIds: string[]) => void
) => {
  if (expanded) {
    setSelectedCategoriesIds(selectedCategoriesIds.filter((id) => id !== category.id));
  } else {
    setSelectedCategoriesIds([...selectedCategoriesIds, category.id]);
  }
};
