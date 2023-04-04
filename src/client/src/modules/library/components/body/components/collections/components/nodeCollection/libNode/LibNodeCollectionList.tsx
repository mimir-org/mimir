import * as helpers from "./helpers";
import { useMemo } from "react";
import { IsBlockView } from "../../../../../../../../../helpers";
import { useDispatch } from "react-redux";
import { LibNodeCollection } from "./LibNodeCollection";
import { CollectionsActions } from "../../../../../../../../../models";
import { customCategorySelector, librarySelector } from "../../../../../../../../../redux/store";
import { NodeLibCm } from "@mimirorg/typelibrary-types";
import { Aspect, AspectObject } from "lib";
import { useAppSelector } from "store";

interface Props {
  collectionState: CollectionsActions;
  selectedLibNodes: NodeLibCm[];
  setSelectedLibNodes: (array: NodeLibCm[]) => void;
  searchString: string;
  selectedLibNode: NodeLibCm | null;
  setSelectedLibNode: (value: NodeLibCm) => void;
  aspectFilters: Aspect[];
  selectedNode: AspectObject;
}

export const LibNodeCollectionList = ({
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
    () => helpers.GetValidLibItems(selectedNode, libState, isBlockView),
    [selectedNode, libState, isBlockView]
  );

  const allLibItems = helpers.GetSharedCategory(validLibItems);
  const recentlyChangedLibItems = helpers.GetRecentlyCreatedCategory(validLibItems);

  const filteredCategories = useMemo(
    () => helpers.GetFilteredLibCategories([recentlyChangedLibItems, allLibItems], searchString),
    [recentlyChangedLibItems, allLibItems, searchString]
  );

  const categories = helpers.FilterByAspect(filteredCategories, aspectFilters);

  return (
    <>
      <LibNodeCollection
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
          <LibNodeCollection
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
