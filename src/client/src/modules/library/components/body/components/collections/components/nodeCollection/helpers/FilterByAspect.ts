import { Aspect } from "../../../../../../../../../models";
import { LibraryCategory } from "../../../../../../../../../models/project";

export const filterByAspect = (libCategories: LibraryCategory[], aspectFilters: Aspect[]): LibraryCategory[] => {
  const categories = JSON.parse(JSON.stringify(libCategories));

  return categories.map((cat) => {
    cat.nodes = cat.nodes.filter((node) => {
      return aspectFilters.includes(node.aspect);
    });
    return cat;
  });
};
