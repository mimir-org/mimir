import { TerminalCategoryObject } from "../../../../../../../../../../models/project";

export const OnCategoryClick = (
  category: TerminalCategoryObject,
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
