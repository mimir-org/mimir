import { LibraryCategory } from "../../../../../../../../models/project";
import { useMemo } from "react";
import { GetFilteredLibCategories } from "./helpers/GetFilteredLibCategories";
import { GetLibCategories } from "./helpers/GetLibCategories";
import { GetSelectedNode } from "../../../../../../../../helpers";
import { useDispatch } from "react-redux";
import { NodeCollection } from "./NodeCollection";
import { FilterByAspect } from "./helpers/FilterByAspect";
import { Aspect, CollectionsActions, LibItem, ObjectType } from "../../../../../../../../models";
import { customCategorySelector, librarySelector, useAppSelector } from "../../../../../../../../redux/store";

interface Props {
  collectionState: CollectionsActions;
  selectedTypes: LibItem[];
  setSelectedTypes: (array: LibItem[]) => void;
  searchString: string;
  selectedElement: string;
  setSelectedElement: (value: string) => void;
  setSelectedElementType: (value: ObjectType) => void;
  aspectFilters: Aspect[];
}

export const NodeCollectionList = ({
  collectionState,
  selectedTypes,
  setSelectedTypes,
  searchString,
  selectedElement,
  setSelectedElement,
  setSelectedElementType,
  aspectFilters,
}: Props) => {
  const dispatch = useDispatch();

  const libState = useAppSelector(librarySelector);
  const customCategory = useAppSelector(customCategorySelector);

  const selectedNode = GetSelectedNode();

  const libCategories = useMemo(() => GetLibCategories(selectedNode, libState), [selectedNode, libState]);
  const filteredCategories = useMemo(() => GetFilteredLibCategories(libCategories, searchString), [libCategories, searchString]);

  const filterCatBySearch = (): LibraryCategory[] => {
    return searchString ? filteredCategories : libCategories;
  };

  return (
    <>
      <NodeCollection
        selectedTypes={selectedTypes}
        setSelectedTypes={setSelectedTypes}
        selectedElement={selectedElement}
        setSelectedElement={setSelectedElement}
        setSelectedElementType={setSelectedElementType}
        key={customCategory.name}
        category={customCategory}
        customCategory={customCategory}
        dispatch={dispatch}
        collectionState={collectionState}
      />
      {FilterByAspect(filterCatBySearch(), aspectFilters).map((category) => {
        return (
          <NodeCollection
            collectionState={collectionState}
            selectedTypes={selectedTypes}
            setSelectedTypes={setSelectedTypes}
            selectedElement={selectedElement}
            setSelectedElement={setSelectedElement}
            setSelectedElementType={setSelectedElementType}
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
