import { useState } from "react";
import { Dispatch } from "redux";
import { CloseIcon } from "../../assets/icons/close";
import { AddIcon } from "../../assets/icons/type";
import { GetAspectColor, GetObjectIcon } from "../../helpers";
import { AspectColorType, LibItem, ObjectType } from "../../models";
import { LibraryCategory } from "../../models/project";
import { OnAddFavoriteClick, OnRemoveFavoriteClick } from "./handlers";
import { GetTypeIcon, SetNewSelectedElement, SetNewSelectedElementType } from "./helpers";
import { Symbol } from "../../compLibrary/symbol";
import { AddFavoriteBox, LibElement, LibElementIcon, LibElementIconWrapper, LibElementText, RemoveFavoriteBox } from "./styled";

interface Props {
  item: LibItem;
  customCategory: LibraryCategory;
  selectedElement: string;
  setSelectedElement: React.Dispatch<React.SetStateAction<string>>;
  setSelectedElementType: React.Dispatch<React.SetStateAction<ObjectType>>;
  isCustomCategory: boolean;
  dispatch: Dispatch;
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
      selectedColor={GetAspectColor(item, AspectColorType.Selected, false)}
      hoverColor={GetAspectColor(item, AspectColorType.Header, false)}
    >
      <LibElementIconWrapper color={GetAspectColor(item, AspectColorType.Main, false)}>
        <LibElementIcon>
          {item.libraryType === ObjectType.Interface || item.libraryType === ObjectType.Transport ? (
            <img src={GetObjectIcon(item)} alt="aspect color" className="icon" draggable="false" />
          ) : (
            item.libraryType === ObjectType.ObjectBlock && <Symbol base64={GetTypeIcon(item?.symbolId)?.data} text={item?.name} />
          )}
        </LibElementIcon>
      </LibElementIconWrapper>
      <LibElementText>{item.name}</LibElementText>
      <RemoveFavoriteBox visible={isCustomCategory} onClick={() => OnRemoveFavoriteClick(dispatch, item)}>
        <img src={CloseIcon} alt="remove" />
      </RemoveFavoriteBox>
      <AddFavoriteBox
        visible={!isCustomCategory && showAddButton}
        onClick={() => OnAddFavoriteClick(dispatch, item, customCategory)}
      >
        <img src={AddIcon} alt="add" />
      </AddFavoriteBox>
    </LibElement>
  );
};

export default LibraryCategoryElement;
