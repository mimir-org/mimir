import { Aspect } from "../../../../../../../../../models";
import { LibraryCategory } from "../../../../../../../../../models/project";

export const FilterByAspect = (libCategories: LibraryCategory[], aspectFilters: Aspect[]): LibraryCategory[] => {
  const categories = JSON.parse(JSON.stringify(libCategories)) as LibraryCategory[];

  return categories.map((cat) => {
    cat.nodes = cat.nodes.filter((node) => {
      return aspectFilters.includes(node.aspect);
    });
    return cat;
  });
};
