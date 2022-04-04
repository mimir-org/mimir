import { LibraryCategory } from "../../../../../../../../../models/project";

export const getFilteredLibCategories = (libCategories: LibraryCategory[], searchString: string): LibraryCategory[] => {
  const searchStringLower = searchString.toLowerCase();

  if (searchStringLower === "") return libCategories;

  return libCategories
    .map((cat) => {
      return { ...cat, nodes: cat.nodes.filter((libItem) => libItem.name.toLowerCase().includes(searchStringLower)) };
    })
    .filter((cat) => cat.nodes.some((y) => y.name.toLowerCase().includes(searchStringLower)));
};
