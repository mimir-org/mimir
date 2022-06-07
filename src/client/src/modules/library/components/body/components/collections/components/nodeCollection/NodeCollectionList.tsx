import { useMemo } from "react";
import { GetFilteredLibCategories } from "./helpers/GetFilteredLibCategories";
import { IsBlockView } from "../../../../../../../../helpers";
import { useDispatch } from "react-redux";
import { NodeCollection } from "./NodeCollection";
import { FilterByAspect } from "./helpers/FilterByAspect";
import { Aspect, CollectionsActions, Node } from "../../../../../../../../models";
import { customCategorySelector, librarySelector, useAppSelector } from "../../../../../../../../redux/store";
import { GetValidLibItems } from "./helpers/GetValidLibItems";
import { GetSharedCategory } from "./helpers/GetSharedCategory";
import { GetRecentlyCreatedCategory } from "./helpers/GetRecentlyCreatedCategory";
import { NodeLibCm } from "@mimirorg/typelibrary-types";

interface Props {
  collectionState: CollectionsActions;
  selectedLibNodes: NodeLibCm[];
  setSelectedLibNodes: (array: NodeLibCm[]) => void;
  searchString: string;
  selectedLibNode: NodeLibCm | null;
  setSelectedLibNode: (value: NodeLibCm) => void;
  aspectFilters: Aspect[];
  selectedNode: Node;
}

export const NodeCollectionList = ({
  collectionState,
  selectedLibNodes,
  setSelectedLibNodes,
  searchString,
  selectedLibNode,
  setSelectedLibNode,
  aspectFilters,
  selectedNode,
}: Props) => {
  const dispatch = useDispatch();
  const libState = useAppSelector(librarySelector);
  const customCategory = useAppSelector(customCategorySelector);
  const isBlockView = IsBlockView();

  const validLibItems = useMemo(
    () => GetValidLibItems(selectedNode, libState, isBlockView),
    [selectedNode, libState, isBlockView]
  );

  const allLibItems = GetSharedCategory(validLibItems);
  const recentlyChangedLibItems = GetRecentlyCreatedCategory(validLibItems);

  const filteredCategories = useMemo(
    () => GetFilteredLibCategories([recentlyChangedLibItems, allLibItems], searchString),
    [recentlyChangedLibItems, allLibItems, searchString]
  );

  // console.log({ libState });
  // console.log({ allLibItems });
  const categories = FilterByAspect(filteredCategories, aspectFilters);

  return (
    <>
      <NodeCollection
        selectedLibNodes={selectedLibNodes}
        setSelectedLibNodes={setSelectedLibNodes}
        selectedLibNode={selectedLibNode}
        setSelectedLibNode={setSelectedLibNode}
        key={customCategory.name}
        category={customCategory}
        customCategory={customCategory}
        dispatch={dispatch}
        collectionState={collectionState}
      />
      {categories.map((category) => {
        return (
          <NodeCollection
            collectionState={collectionState}
            selectedLibNodes={selectedLibNodes}
            setSelectedLibNodes={setSelectedLibNodes}
            selectedLibNode={selectedLibNode}
            setSelectedLibNode={setSelectedLibNode}
            key={category.name}
            category={category}
            customCategory={customCategory}
            dispatch={dispatch}
            searchList={filteredCategories}
          />
        );
      })}
    </>
  );
};
