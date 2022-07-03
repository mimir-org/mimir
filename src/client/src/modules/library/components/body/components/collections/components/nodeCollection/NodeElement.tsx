import { useState } from "react";
import { Dispatch } from "redux";
import { Color } from "../../../../../../../../assets/color/Color";
import { Checkbox } from "../../../../../../../../compLibrary/input/checkbox/common/Checkbox";
import { LibraryCategory } from "../../../../../../../../models/project";
import { GetAspectColor } from "../../../../../../../../helpers";
import { AspectColorType, CollectionsActions } from "../../../../../../../../models";
import { NodeElementButton, NodeElementText } from "./NodeElement.styled";
import { FavoriteComponent } from "./FavoriteComponent";
import { NodeLibCm } from "@mimirorg/typelibrary-types";
import { NodeElementIconContainer } from "./NodeElementIconComponent.styled";
import { Icon } from "../../../../../../../../compLibrary/icon/Icon";
import { OnCheckboxChange, OnFavoriteClick } from "./handlers";

interface Props {
  item: NodeLibCm;
  customCategory: LibraryCategory;
  selectedLibNode: NodeLibCm;
  setSelectedLibNode: (value: NodeLibCm) => void;
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
  selectedLibNodes,
  setSelectedLibNodes,
  collectionState,
  dispatch,
}: Props) => {
  const [showFavoriteButton, setShowFavoriteButton] = useState(false);
  const isSelected = selectedLibNodes.some((n) => n.id === item.id);
  const isItemFavorite = customCategory.nodes?.find((n) => n.id === item.id);
  const isManageType = collectionState === CollectionsActions.ManageType;
  const addNewFavorite = showFavoriteButton && !isItemFavorite;

  const onDragStart = (event, node) => {
    event.dataTransfer.setData("application/reactflow", node);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <NodeElementButton
      onMouseEnter={() => setShowFavoriteButton(true)}
      onMouseLeave={() => setShowFavoriteButton(false)}
      active={selectedLibNode?.id === item.id}
      onClick={() => setSelectedLibNode(item)}
      draggable
      onDragStart={(event) => onDragStart(event, JSON.stringify(item))}
      key={item.id}
      selectedColor={GetAspectColor(item, AspectColorType.Selected)}
      hoverColor={GetAspectColor(item, AspectColorType.Header)}
    >
      <NodeElementIconContainer color={GetAspectColor(item, AspectColorType.Main)}>
        <Icon size={20} src={item.symbol} alt="aspect color" draggable="false" />
      </NodeElementIconContainer>
      <NodeElementText>{item.name}</NodeElementText>

      {isManageType && (
        <Checkbox
          isChecked={isSelected}
          onChange={() => OnCheckboxChange(item, selectedLibNodes, setSelectedLibNodes, isSelected)}
          color={Color.BLACK}
        />
      )}
      {showFavoriteButton && (
        <FavoriteComponent addNewFavorite={addNewFavorite} onClick={() => OnFavoriteClick(item, addNewFavorite, dispatch)} />
      )}
    </NodeElementButton>
  );
};
