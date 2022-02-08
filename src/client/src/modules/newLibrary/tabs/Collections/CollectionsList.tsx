import { Aspect, ObjectType } from "../../../../models";
import { CollectionsListWrapper } from "./styled";
import { LibraryCategory } from "../../../../models/project";
import { useMemo } from "react";
import { GetFilteredLibCategories, GetLibCategories } from "../../helpers";
import { customCategorySelector, librarySelector, useAppSelector } from "../../../../redux/store";
import { GetSelectedNode } from "../../../../helpers";
import { LibraryCategoryComponent } from "../..";
import { useDispatch } from "react-redux";
import { FilterByAspect } from "./helpers";
// import data from "../Collections/Collections.json";
// import { Collection } from ".";

interface Props {
  // collectionState: CollectionsActions;
  // activeTab: LibraryTab;
  // selectedCollections: string[];
  searchString: string;
  selectedElement: string;
  setSelectedElement: React.Dispatch<React.SetStateAction<string>>;
  setSelectedElementType: React.Dispatch<React.SetStateAction<ObjectType>>;
  aspectFilters: Aspect[];
}

const CollectionsList = ({
  // collectionState,
  // activeTab,
  // selectedCollections,
  searchString,
  selectedElement,
  setSelectedElement,
  setSelectedElementType,
  aspectFilters,
}: Props) => {
  const dispatch = useDispatch();
  // const isChecked = (id: string) => {
  //   return selectedCollections.includes(id);
  // };
  // const collections =
  //   collectionState === CollectionsActions.ReadOnly ? data.collections.filter((x) => isChecked(x.id) === true) : data.collections;

  const libState = useAppSelector(librarySelector);
  const customCategory = useAppSelector(customCategorySelector);

  const selectedNode = GetSelectedNode();

  const libCategories = useMemo(() => GetLibCategories(selectedNode, libState), [selectedNode, libState]);
  const filteredCategories = useMemo(() => GetFilteredLibCategories(libCategories, searchString), [libCategories, searchString]);

  const filterCatBySearch = (): LibraryCategory[] => {
    return searchString ? filteredCategories : libCategories;
  };

  return (
    <CollectionsListWrapper>
      <LibraryCategoryComponent
        selectedElement={selectedElement}
        setSelectedElement={setSelectedElement}
        setSelectedElementType={setSelectedElementType}
        key={customCategory.name}
        category={customCategory}
        customCategory={customCategory}
        dispatch={dispatch}
      />
      {FilterByAspect(filterCatBySearch(), aspectFilters).map((category) => {
        return (
          <LibraryCategoryComponent
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

      {/* {collections.map((collection) => (
        <Collection
          key={collection.id}
          id={collection.id}
          name={collection.name}
          checked={isChecked(collection.id)}
          typeCategories={collection.typeCategories}
          position={collection.position}
          collectionState={collectionState}
          activeTab={activeTab}
          onChange={onChange}
        />
      ))} */}
    </CollectionsListWrapper>
  );
};

export default CollectionsList;
