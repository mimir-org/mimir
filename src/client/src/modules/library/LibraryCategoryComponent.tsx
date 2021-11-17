import { useState } from "react";
import { LibraryCategory } from "../../models/project";
import { ExpandIcon, CollapseIcon } from "../../assets/icons/chevron";
import { LibCategory, LibCategoryElement } from "./styled";
import { LibraryCategoryElement } from ".";

interface Props {
  customCategory: LibraryCategory;
  category: LibraryCategory;
  selectedElement: string;
  setSelectedElement: any;
  setSelectedElementType: any;
  dispatch: any;
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
}: Props) => {
  const [expanded, setExpanded] = useState(false);
  const expandIcon = expanded ? ExpandIcon : CollapseIcon;
  const isCustomCategory = category.name === "Favorites";

  return (
    <>
      <LibCategory onClick={() => setExpanded(!expanded)}>
        <LibCategoryElement>{category.name}</LibCategoryElement>
        <img className="expandIcon" src={expandIcon} alt="expand-icon"></img>
      </LibCategory>
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

export default LibraryCategoryComponent;
