import { LibraryCategory } from "../../../models/project";

export const GetFilteredLibCategories = (libCategories: LibraryCategory[], searchString: string): LibraryCategory[] => {
  const searchStringLower = searchString.toLowerCase();
  if (searchString === "") {
    return [];
  } else {
    return libCategories.filter((x) => x.nodes.some((y) => y.name.toLowerCase().includes(searchStringLower)));
  }
};
