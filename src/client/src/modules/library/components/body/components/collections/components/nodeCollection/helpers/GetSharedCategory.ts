import { LibItem } from "../../../../../../../../../models";
import { LibraryCategory } from "../../../../../../../../../models/project";
import { TextResources } from "../../../../../../../../../assets/text/TextResources";

export const getSharedCategory = (items: LibItem[]): LibraryCategory => {
  const sortedByAspectThenByName = [...items].sort((a, b) => a.aspect - b.aspect || a.name.localeCompare(b.name));

  return {
    name: TextResources.LIBRARY_CATEGORY_ALL,
    nodes: sortedByAspectThenByName,
  };
};
