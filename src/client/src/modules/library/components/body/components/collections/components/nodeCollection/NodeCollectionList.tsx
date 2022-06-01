import { useMemo } from "react";
import { GetFilteredLibCategories } from "./helpers/GetFilteredLibCategories";
import { IsBlockView } from "../../../../../../../../helpers";
import { useDispatch } from "react-redux";
import { NodeCollection } from "./NodeCollection";
import { FilterByAspect } from "./helpers/FilterByAspect";
import { Aspect, CollectionsActions, LibItem, Node } from "../../../../../../../../models";
import { customCategorySelector, librarySelector, useAppSelector } from "../../../../../../../../redux/store";
import { GetValidLibItems } from "./helpers/GetValidLibItems";
import { GetSharedCategory } from "./helpers/GetSharedCategory";
import { GetRecentlyCreatedCategory } from "./helpers/GetRecentlyCreatedCategory";

interface Props {
  collectionState: CollectionsActions;
  selectedTypes: LibItem[];
  setSelectedTypes: (array: LibItem[]) => void;
  searchString: string;
  selectedElement: LibItem | null;
  setSelectedElement: (value: LibItem) => void;
  aspectFilters: Aspect[];
  selectedNode: Node;
}

export const NodeCollectionList = ({
  collectionState,
  selectedTypes,
  setSelectedTypes,
  searchString,
  selectedElement,
  setSelectedElement,
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

  const categories = FilterByAspect(filteredCategories, aspectFilters);

  return (
    <>
      {/* <NodeCollection
        selectedTypes={selectedTypes}
        setSelectedTypes={setSelectedTypes}
        selectedElement={selectedElement}
        setSelectedElement={setSelectedElement}
        key={customCategory.name}
        category={customCategory}
        customCategory={customCategory}
        dispatch={dispatch}
        collectionState={collectionState}
      /> */}
      {categories.map((category) => {
        return (
          <NodeCollection
            collectionState={collectionState}
            selectedTypes={selectedTypes}
            setSelectedTypes={setSelectedTypes}
            selectedElement={selectedElement}
            setSelectedElement={setSelectedElement}
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
