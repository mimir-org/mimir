import { Aspect, CollectionsActions, LibItem, ObjectType } from "../../../../models";
import { LibraryCategory } from "../../../../models/project";
import { useMemo } from "react";
import { GetFilteredLibCategories, GetLibCategories } from "../../helpers";
import { customCategorySelector, librarySelector, useAppSelector } from "../../../../redux/store";
import { GetSelectedNode } from "../../../../helpers";
import { LibraryCategoryComponent } from "../..";
import { useDispatch } from "react-redux";
import { FilterByAspect } from "./helpers";

interface Props {
  collectionState: CollectionsActions;
  selectedTypes: LibItem[];
  setSelectedTypes: (array: LibItem[]) => void;
  searchString: string;
  selectedElement: string;
  setSelectedElement: React.Dispatch<React.SetStateAction<string>>;
  setSelectedElementType: React.Dispatch<React.SetStateAction<ObjectType>>;
  aspectFilters: Aspect[];
}

const OldLibraryComponent = ({
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
      <LibraryCategoryComponent
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
          <LibraryCategoryComponent
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

export default OldLibraryComponent;
