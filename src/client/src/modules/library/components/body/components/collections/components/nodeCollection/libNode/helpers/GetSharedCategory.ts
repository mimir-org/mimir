import { LibraryCategory } from "../../../../../../../../../../models/project";
import { TextResources } from "../../../../../../../../../../assets/text/TextResources";
import { BlockLibCm } from "@mimirorg/typelibrary-types";

const GetSharedCategory = (items: BlockLibCm[]): LibraryCategory => {
  const sortedByAspectThenByName = [...items].sort((a, b) => a.aspect - b.aspect || a.name.localeCompare(b.name));
  return { name: TextResources.CATEGORY_ALL, nodes: sortedByAspectThenByName };
};

export default GetSharedCategory;
