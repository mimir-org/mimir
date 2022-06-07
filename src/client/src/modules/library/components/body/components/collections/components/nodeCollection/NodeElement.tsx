import { useState } from "react";
import { Dispatch } from "redux";
import { Color } from "../../../../../../../../assets/color/Color";
import { Checkbox } from "../../../../../../../../compLibrary/input/checkbox/common/Checkbox";
import { LibraryCategory } from "../../../../../../../../models/project";
import { GetAspectColor } from "../../../../../../../../helpers";
import { AspectColorType, CollectionsActions } from "../../../../../../../../models";
import { NodeElementButton, NodeElementText } from "./NodeElement.styled";
import { NodeElementIconComponent } from "./NodeElementIconComponent";
import { OnCheckboxChange, OnAddFavoriteClick, OnRemoveFavoriteClick } from "./handlers";
import { FavoriteComponent } from "./FavoriteComponent";
import { NodeLibCm } from "@mimirorg/typelibrary-types";

interface Props {
  item: NodeLibCm;
  customCategory: LibraryCategory;
  selectedLibNode: NodeLibCm;
  setSelectedLibNode: (value: NodeLibCm) => void;
  isCustomCategory: boolean;
  dispatch: Dispatch;
  selectedLibNodes: NodeLibCm[];
  setSelectedLibNodes: (array: NodeLibCm[]) => void;
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
  selectedLibNode,
  setSelectedLibNode,
  isCustomCategory,
  selectedLibNodes,
  setSelectedLibNodes,
  collectionState,
  dispatch,
}: Props) => {
  const [showAddButton, setShowAddButton] = useState(false);
  const selected = selectedLibNodes.some((n) => n.id === item.id);
  const isItemFavorite = customCategory.nodes?.find((n) => n.id === item.id);

  const onDragStart = (event, node) => {
    event.dataTransfer.setData("application/reactflow", node);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <NodeElementButton
      onMouseEnter={() => setShowAddButton(true)}
      onMouseLeave={() => setShowAddButton(false)}
      active={selectedLibNode?.id === item.id}
      onClick={() => setSelectedLibNode(item)}
      draggable
      onDragStart={(event) => onDragStart(event, JSON.stringify(item))}
      key={item.id}
      selectedColor={GetAspectColor(item, AspectColorType.Selected, false)}
      hoverColor={GetAspectColor(item, AspectColorType.Header, false)}
    >
      <NodeElementIconComponent item={item} />
      <NodeElementText>{item.name}</NodeElementText>

      {collectionState === CollectionsActions.ManageType && (
        <Checkbox
          isChecked={selected}
          onChange={() => OnCheckboxChange(item, selectedLibNodes, setSelectedLibNodes, selected)}
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
