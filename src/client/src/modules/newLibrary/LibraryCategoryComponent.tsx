import { memo, useEffect, useState } from "react";
import { LibraryCategory } from "../../models/project";
import { CollapseIcon, ExpandIcon } from "../../assets/icons/chevron";
import { LibCategoryButton, LibCategoryHeader } from "./styled";
import { LibraryCategoryElement } from ".";
import { Dispatch } from "redux";
import { ObjectType } from "../../models";

interface Props {
  customCategory: LibraryCategory;
  category: LibraryCategory;
  selectedElement: string;
  setSelectedElement: React.Dispatch<React.SetStateAction<string>>;
  setSelectedElementType: React.Dispatch<React.SetStateAction<ObjectType>>;
  dispatch: Dispatch;
  searchList?: LibraryCategory[];
}

/**
 * Component for a Category in the Library in Mimir.
 * @param interface
 * @returns a drop-down menu of a given Category.
 */
const LibraryCategoryComponent = ({
  category,
  customCategory,
  selectedElement,
  setSelectedElement,
  setSelectedElementType,
  dispatch,
  searchList,
}: Props) => {
  const [expanded, setExpanded] = useState(true);
  const expandIcon = expanded ? ExpandIcon : CollapseIcon;
  const isCustomCategory = category.name === "Favorites";

  useEffect(() => {
    if (searchList && searchList.length > 0 && searchList.includes(category)) {
      setExpanded(true);
    }
  }, [category, searchList]);

  return (
    <>
      <LibCategoryButton onClick={() => setExpanded(!expanded)}>
        <LibCategoryHeader>{category.name}</LibCategoryHeader>
        <img className="expandIcon" src={expandIcon} alt="expand-icon" />
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
            />
          );
        })}
    </>
  );
};

export default memo(LibraryCategoryComponent);
