import { useState } from "react";
import { CloseIcon } from "../../assets/icons/close";
import { AddIcon } from "../../assets/icons/type";
import { GetAspectColor, GetObjectIcon } from "../../helpers";
import { AspectColorType, LibItem, ObjectType } from "../../models";
import { LibraryCategory } from "../../models/project";
import { OnRemoveFavoriteClick, OnAddFavoriteClick } from "./handlers";
import { SetNewSelectedElement, SetNewSelectedElementType } from "./helpers";
import { AddFavoriteBox, LibElement, LibElementIcon, RemoveFavoriteBox } from "./styled";

interface Props {
  item: LibItem;
  customCategory: LibraryCategory;
  selectedElement: string;
  setSelectedElement: any;
  setSelectedElementType: any;
  isCustomCategory: boolean;
  dispatch: any;
}

/**
 * Component for an element in a LibraryCategory drop-down menu.
 * @param interface
 * @returns a draggable element.
 */
const LibraryCategoryElement = ({
  item,
  customCategory,
  selectedElement,
  setSelectedElement,
  setSelectedElementType,
  isCustomCategory,
  dispatch,
}: Props) => {
  const [showAddButton, setShowAddButton] = useState(false);

  const onDragStart = (event, node) => {
    event.dataTransfer.setData("application/reactflow", node);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <LibElement
      onMouseEnter={() => setShowAddButton(true)}
      onMouseLeave={() => setShowAddButton(false)}
      active={selectedElement === item.id}
      onClick={() => {
        SetNewSelectedElement(item, setSelectedElement);
        SetNewSelectedElementType(item.libraryType, setSelectedElementType);
      }}
      draggable={item.libraryType === ObjectType.ObjectBlock}
      onDragStart={(event) => item.libraryType === ObjectType.ObjectBlock && onDragStart(event, JSON.stringify(item))}
      key={item.id}
    >
      {item.name}
      <RemoveFavoriteBox visible={isCustomCategory} onClick={() => OnRemoveFavoriteClick(dispatch, item)}>
        <img src={CloseIcon} alt="remove" />
      </RemoveFavoriteBox>

      <AddFavoriteBox
        visible={!isCustomCategory && showAddButton}
        onClick={() => OnAddFavoriteClick(dispatch, item, customCategory)}
      >
        <img src={AddIcon} alt="add" />
      </AddFavoriteBox>

      <LibElementIcon color={GetAspectColor(item, AspectColorType.Main, false)}>
        {(item.libraryType === ObjectType.Interface || item.libraryType === ObjectType.Transport) && (
          <img src={GetObjectIcon(item)} alt="aspect-icon" className="icon" draggable="false"></img>
        )}
      </LibElementIcon>
    </LibElement>
  );
};

export default LibraryCategoryElement;
