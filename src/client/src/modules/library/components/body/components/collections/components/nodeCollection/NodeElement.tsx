import { useState } from "react";
import { Dispatch } from "redux";
import { Color } from "../../../../../../../../compLibrary/colors";
import { Checkbox } from "../../../../../../../../compLibrary/input/checkbox/common";
import { LibraryCategory } from "../../../../../../../../models/project";
import { SetNewSelectedElement } from "./helpers/SetNewSelectedElement";
import { SetNewSelectedElementType } from "./helpers/SetNewSelectedElementType";
import { GetAspectColor } from "../../../../../../../../helpers";
import { AspectColorType, CollectionsActions, LibItem, ObjectType } from "../../../../../../../../models";
import { NodeElementButton, NodeElementText } from "./NodeElement.styled";
import { NodeElementIconComponent } from "./NodeElementIconComponent";
import { OnCheckboxChange, OnAddFavoriteClick, OnRemoveFavoriteClick } from "./handlers";
import { FavoriteComponent } from "./FavoriteComponent";

interface Props {
  item: LibItem;
  customCategory: LibraryCategory;
  selectedElement: string;
  setSelectedElement: (value: string) => void;
  setSelectedElementType: (value: ObjectType) => void;
  isCustomCategory: boolean;
  dispatch: Dispatch;
  selectedTypes: LibItem[];
  setSelectedTypes: (array: LibItem[]) => void;
  collectionState: CollectionsActions;
}

/**
 * Component for an element in a LibraryCategory drop-down menu.
 * @param interface
 * @returns a draggable element.
 */
export const NodeElement = ({
  item,
  customCategory,
  selectedElement,
  setSelectedElement,
  setSelectedElementType,
  isCustomCategory,
  selectedTypes,
  setSelectedTypes,
  collectionState,
  dispatch,
}: Props) => {
  const [showAddButton, setShowAddButton] = useState(false);
  const isSelected = selectedTypes.some((x) => x.id === item.id);
  const isItemFavorite = customCategory.nodes?.find((n) => n.id === item.id);
  const managingType = collectionState === CollectionsActions.ManageType;

  const onDragStart = (event, node) => {
    event.dataTransfer.setData("application/reactflow", node);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <NodeElementButton
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
      <NodeElementIconComponent item={item} />
      <NodeElementText>{item.name}</NodeElementText>
      {/* <LibElementVersion>
        {TextResources.Library_Type_Version}
        {item.version}
      </LibElementVersion> */}
      {managingType && (
        <Checkbox
          isChecked={isSelected}
          onChange={() => OnCheckboxChange(item, selectedTypes, setSelectedTypes, isSelected)}
          color={Color.Black}
        />
      )}
      {isCustomCategory && !managingType && <FavoriteComponent onClick={() => OnRemoveFavoriteClick(item, dispatch)} />}
      {!isCustomCategory && showAddButton && !isItemFavorite && !managingType && (
        <FavoriteComponent addFavorite onClick={() => OnAddFavoriteClick(item, customCategory, dispatch)} />
      )}
    </NodeElementButton>
  );
};
