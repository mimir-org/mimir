import React, { useState } from "react";
import { Dispatch } from "redux";
import { Tooltip } from "../../compLibrary/tooltip/Tooltip";
import { Symbol } from "../../compLibrary/symbol";
import { Icon } from "../../compLibrary/icon";
import { TextResources } from "../../assets/text";
import { LibraryCategory } from "../../models/project";
import { GetAspectColor, GetObjectIcon } from "../../helpers";
import { AspectColorType, LibItem, ObjectType } from "../../models";
import { OnAddFavoriteClick, OnRemoveFavoriteClick } from "./handlers";
import { GetTypeIcon, SetNewSelectedElement, SetNewSelectedElementType } from "./helpers";
import { FavoriteBox, LibElement, LibElementIconWrapper, LibElementText } from "./styled";
import { AddFavoriteIcon, RemoveFavoriteIcon } from "../../assets/icons/favorites";

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
        {item.libraryType === ObjectType.Interface || item.libraryType === ObjectType.Transport ? (
          <Icon size={20} src={GetObjectIcon(item)} alt="aspect color" draggable="false" />
        ) : (
          item.libraryType === ObjectType.ObjectBlock && <Symbol base64={GetTypeIcon(item?.symbolId)?.data} text={item?.name} />
        )}
      </LibElementIconWrapper>
      <LibElementText>{item.name}</LibElementText>

      {isCustomCategory && (
        <Tooltip content={TextResources.Library_Remove_Favorite} offset={[0, 5]}>
          <FavoriteBox tabIndex={0} onClick={() => OnRemoveFavoriteClick(dispatch, item)}>
            <Icon size={10} src={RemoveFavoriteIcon} alt="remove" />
          </FavoriteBox>
        </Tooltip>
      )}

      {!isCustomCategory && showAddButton && (
        <Tooltip content={TextResources.Library_Add_Favorite} offset={[0, 5]}>
          <FavoriteBox tabIndex={0} onClick={() => OnAddFavoriteClick(dispatch, item, customCategory)}>
            <Icon size={10} src={AddFavoriteIcon} alt="add" />
          </FavoriteBox>
        </Tooltip>
      )}
    </LibElement>
  );
};

export default LibraryCategoryElement;
