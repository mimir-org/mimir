import { LibraryCategory } from "../../../models/project";

export const GetFilteredLibCategories = (libCategories: LibraryCategory[], searchString: string): LibraryCategory[] => {
  const searchStringLower = searchString.toLowerCase();
  if (searchString === "") {
    return [];
  } else {
    return libCategories.map((cat) => {
      return { ...cat, nodes: cat.nodes.filter((libItem) => libItem.name.toLowerCase().includes(searchStringLower)) };
    });
  }
};
