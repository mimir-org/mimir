import { CategoryObject } from "../helpers/PopulateTerminalCategories";

export const OnCategoryClick = (
  category: CategoryObject,
  expanded: boolean,
  selectedCategories: string[],
  setSelectedCategories: (categoryIds: string[]) => void
) => {
  if (expanded) {
    setSelectedCategories(selectedCategories.filter((name) => name !== category.name));
  } else {
    setSelectedCategories([...selectedCategories, category.name]);
  }
};
