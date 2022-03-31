import { useMemo } from "react";
import { getFilteredLibCategories } from "./helpers/GetFilteredLibCategories";
import { IsBlockView } from "../../../../../../../../helpers";
import { useDispatch } from "react-redux";
import { NodeCollection } from "./NodeCollection";
import { filterByAspect } from "./helpers/FilterByAspect";
import { Aspect, CollectionsActions, LibItem } from "../../../../../../../../models";
import { customCategorySelector, librarySelector, useAppSelector } from "../../../../../../../../redux/store";
import { getValidLibItems } from "./helpers/GetValidLibItems";
import { getSharedCategory } from "./helpers/GetSharedCategory";
import { getRecentlyCreatedCategory } from "./helpers/GetRecentlyCreatedCategory";
import { GetSelectedNode } from "../../../../../../../../helpers/Selected";

interface Props {
  collectionState: CollectionsActions;
  selectedTypes: LibItem[];
  setSelectedTypes: (array: LibItem[]) => void;
  searchString: string;
  selectedElement: LibItem | null;
  setSelectedElement: (value: LibItem) => void;
  aspectFilters: Aspect[];
}

export const NodeCollectionList = ({
  collectionState,
  selectedTypes,
  setSelectedTypes,
  searchString,
  selectedElement,
  setSelectedElement,
  aspectFilters,
}: Props) => {
  const dispatch = useDispatch();
  const libState = useAppSelector(librarySelector);
  const customCategory = useAppSelector(customCategorySelector);
  const isBlockView = IsBlockView();
  const selectedNode = GetSelectedNode();

  const validLibItems = useMemo(
    () => getValidLibItems(selectedNode, libState, isBlockView),
    [selectedNode, libState, isBlockView]
  );

  const allLibItems = getSharedCategory(validLibItems);
  const recentlyChangedLibItems = getRecentlyCreatedCategory(validLibItems);

  const filteredCategories = useMemo(
    () => getFilteredLibCategories([recentlyChangedLibItems, allLibItems], searchString),
    [recentlyChangedLibItems, allLibItems, searchString]
  );

  return (
    <>
      <NodeCollection
        selectedTypes={selectedTypes}
        setSelectedTypes={setSelectedTypes}
        selectedElement={selectedElement}
        setSelectedElement={setSelectedElement}
        key={customCategory.name}
        category={customCategory}
        customCategory={customCategory}
        dispatch={dispatch}
        collectionState={collectionState}
      />
      {filterByAspect(filteredCategories, aspectFilters).map((category) => {
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
