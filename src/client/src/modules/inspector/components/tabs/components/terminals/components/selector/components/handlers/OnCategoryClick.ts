import { CategoryObject } from "../TerminalsList";

export const OnCategoryClick = (
  category: CategoryObject,
  expanded: boolean,
  selectedCategories: string[],
  setSelectedCategories: (categoryIds: string[]) => void
) => {
  if (expanded) {
    setSelectedCategories(selectedCategories.filter((name) => name !== category.name));
  } else {
    setSelectedCategories([category.name]); // TODO: fix
  }
};
