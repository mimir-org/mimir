import { LibraryCategory } from "../../../../../../../../../models/project";

export const GetFilteredLibCategories = (libCategories: LibraryCategory[], searchString: string): LibraryCategory[] => {
  const searchStringLower = searchString.toLowerCase();
  if (searchStringLower === "") return libCategories;

  const mappedLibCategories = libCategories.map((cat) => {
    return { ...cat, nodes: cat.nodes.filter((libItem) => libItem.name.toLowerCase().includes(searchStringLower)) };
  });

  return mappedLibCategories.filter((cat) => cat.nodes.some((libItem) => libItem.name.toLowerCase().includes(searchStringLower)));
};
