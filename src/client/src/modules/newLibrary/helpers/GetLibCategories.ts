import { ValidateLibComponent } from ".";
import { LibItem, Node } from "../../../models";
import { LibraryCategory } from "../../../models/project";
import { LibraryState } from "../../../redux/store/library/types";
import { IsBlockView } from "../../../helpers";

const GetLibCategories = (selectedNode: Node, state: LibraryState) => {
  const allCategories: LibraryCategory[] = [];
  const items: LibItem[] = [].concat(state.nodeTypes, state.interfaceTypes, state.transportTypes);

  const result = items.reduce((r, a) => {
    r[a?.category] = r[a?.category] || [];
    ValidateLibComponent(a, selectedNode, IsBlockView()) && r[a?.category].push(a);
    return r;
  }, Object.create([]));

  const objectArray = Object.entries(result);

  objectArray.forEach(([key, value]) => {
    const libCategory: LibraryCategory = {
      name: key,
      nodes: value as LibItem[],
    };

    libCategory.nodes.length > 0 && allCategories.push(libCategory);
  });

  return allCategories;
};

export default GetLibCategories;
