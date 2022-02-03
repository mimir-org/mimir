import { Aspect } from "../../../../../models";
import { LibraryCategory } from "../../../../../models/project";

const FilterByAspect = (
  functionSort,
  productSort,
  locationSort: boolean,
  libCategories: LibraryCategory[]
): LibraryCategory[] => {
  const categories = JSON.parse(JSON.stringify(libCategories));
  const selectedAspects = [];
  if (functionSort) selectedAspects.push(Aspect.Function);
  if (productSort) selectedAspects.push(Aspect.Product);
  if (locationSort) selectedAspects.push(Aspect.Location);

  return categories.map((cat) => {
    cat.nodes = cat.nodes.filter((node) => {
      return selectedAspects.includes(node.aspect);
    });
    return cat;
  });
};

export default FilterByAspect;
