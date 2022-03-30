import { LibItem } from "../../../../../../../../../models";
import { LibraryCategory } from "../../../../../../../../../models/project";
import { TextResources } from "../../../../../../../../../assets/text/TextResources";

export const getSharedCategory = (items: LibItem[]): LibraryCategory => {
  const sortedByAspect = [...items].sort((a, b) => a.aspect - b.aspect);

  return {
    name: TextResources.LIBRARY_CATEGORY_ALL,
    nodes: sortedByAspect,
  };
};
