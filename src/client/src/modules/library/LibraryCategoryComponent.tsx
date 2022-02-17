import { memo, useEffect, useState } from "react";
import { LibraryCategory } from "../../models/project";
import { LibCategoryButton, LibCategoryHeader, LibCollectionWrapper } from "./styled";
import { LibraryCategoryElement } from ".";
import { Dispatch } from "redux";
import { CollectionsActions, LibItem, ObjectType } from "../../models";

interface Props {
  collectionState: CollectionsActions;
  customCategory: LibraryCategory;
  category: LibraryCategory;
  selectedElement: string;
  setSelectedElement: React.Dispatch<React.SetStateAction<string>>;
  setSelectedElementType: React.Dispatch<React.SetStateAction<ObjectType>>;
  dispatch: Dispatch;
  searchList?: LibraryCategory[];
  selectedTypes: LibItem[];
  setSelectedTypes: (array: LibItem[]) => void;
}

/**
 * Component for a Category in the Library in Mimir.
 * @param interface
 * @returns a drop-down menu of a given Category.
 */
const LibraryCategoryComponent = ({
  collectionState,
  category,
  customCategory,
  selectedElement,
  setSelectedElement,
  setSelectedElementType,
  dispatch,
  searchList,
  selectedTypes,
  setSelectedTypes,
}: Props) => {
  const [expanded, setExpanded] = useState(true);
  const isCustomCategory = category.name === "Favorites";

  useEffect(() => {
    if (searchList && searchList.length > 0 && searchList.includes(category)) {
      setExpanded(true);
    }
  }, [category, searchList]);

  return (
    <LibCollectionWrapper isOpen={expanded}>
      <LibCategoryButton isOpen={expanded} onClick={() => setExpanded(!expanded)}>
        <LibCategoryHeader isOpen={expanded}>{category.name}</LibCategoryHeader>
      </LibCategoryButton>
      {expanded &&
        category?.nodes.map((item) => {
          return (
            <LibraryCategoryElement
              key={item.id}
              item={item}
              customCategory={customCategory}
              selectedElement={selectedElement}
              setSelectedElement={setSelectedElement}
              setSelectedElementType={setSelectedElementType}
              isCustomCategory={isCustomCategory}
              dispatch={dispatch}
              selectedTypes={selectedTypes}
              setSelectedTypes={setSelectedTypes}
              collectionState={collectionState}
            />
          );
        })}
    </LibCollectionWrapper>
  );
};

export default memo(LibraryCategoryComponent);
