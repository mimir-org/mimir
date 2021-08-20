import { concat } from "lodash";
import { ValidateLibComponent } from ".";
import { Node } from "../../../../models";
import { LibCategory } from "../../../../models/project";
import { LibraryState } from "../../../../redux/store/library/types";
import { IsBlockView } from "../../../flow/helpers/block";

const GetLibCategories = (
  selectedNode: Node,
  splitView: boolean,
  state: LibraryState
) => {
  var allCategories = [];

  var items = concat(
    state.nodeTypes,
    state.interfaceTypes,
    state.transportTypes
  );

  const result = items.reduce((r, a) => {
    r[a?.category] = r[a?.category] || [];
    ValidateLibComponent(a, selectedNode, IsBlockView(), splitView) &&
      r[a?.category].push(a);
    return r;
  }, Object.create([]));

  const objectArray = Object.entries(result);

  objectArray.forEach(([key, value]) => {
    var libCategory = {
      name: key,
      nodes: value,
      visible: false,
    } as LibCategory;

    libCategory.nodes.length > 0 && allCategories.push(libCategory);
  });

  return allCategories;
};

export default GetLibCategories;
