import { useState } from "react";
import { Dispatch } from "redux";
import { Color } from "../../../../../../../../compLibrary/colors/Color";
import { Checkbox } from "../../../../../../../../compLibrary/input/checkbox/common/Checkbox";
import { LibraryCategory } from "../../../../../../../../models/project";
import { GetAspectColor } from "../../../../../../../../helpers";
import { AspectColorType, CollectionsActions, LibItem, ObjectType } from "../../../../../../../../models";
import { NodeElementButton, NodeElementText } from "./NodeElement.styled";
import { NodeElementIconComponent } from "./NodeElementIconComponent";
import { OnCheckboxChange, OnAddFavoriteClick, OnRemoveFavoriteClick } from "./handlers";
import { FavoriteComponent } from "./FavoriteComponent";

interface Props {
  item: LibItem;
  customCategory: LibraryCategory;
  selectedElement: LibItem;
  setSelectedElement: (value: LibItem) => void;
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
  isCustomCategory,
  selectedTypes,
  setSelectedTypes,
  collectionState,
  dispatch,
}: Props) => {
  const [showAddButton, setShowAddButton] = useState(false);
  const selected = selectedTypes.some((x) => x.id === item.id);
  const isItemFavorite = customCategory.nodes?.find((n) => n.id === item.id);

  const onDragStart = (event, node) => {
    event.dataTransfer.setData("application/reactflow", node);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <NodeElementButton
      onMouseEnter={() => setShowAddButton(true)}
      onMouseLeave={() => setShowAddButton(false)}
      active={selectedElement && selectedElement.id === item.id}
      onClick={() => setSelectedElement(item)}
      draggable={item.libraryType === ObjectType.ObjectBlock}
      onDragStart={(event) => item.libraryType === ObjectType.ObjectBlock && onDragStart(event, JSON.stringify(item))}
      key={item.id}
      selectedColor={GetAspectColor(item, AspectColorType.Selected, false)}
      hoverColor={GetAspectColor(item, AspectColorType.Header, false)}
    >
      <NodeElementIconComponent item={item} />
      <NodeElementText>{item.name}</NodeElementText>

      {collectionState === CollectionsActions.ManageType && (
        <Checkbox
          isChecked={selected}
          onChange={() => OnCheckboxChange(item, selectedTypes, setSelectedTypes, selected)}
          color={Color.BLACK}
        />
      )}
      {isCustomCategory && <FavoriteComponent onClick={() => OnRemoveFavoriteClick(item, dispatch)} />}
      {!isCustomCategory && showAddButton && !isItemFavorite && (
        <FavoriteComponent addFavorite onClick={() => OnAddFavoriteClick(item, customCategory, dispatch)} />
      )}
    </NodeElementButton>
  );
};
