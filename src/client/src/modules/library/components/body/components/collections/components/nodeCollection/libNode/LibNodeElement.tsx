import { useState } from "react";
import { Dispatch } from "redux";
import { Color } from "../../../../../../../../../assets/color/Color";
import { Checkbox } from "../../../../../../../../../compLibrary/input/checkbox/common/Checkbox";
import { LibraryCategory } from "../../../../../../../../../models/project";
import { GetAspectColor } from "../../../../../../../../../helpers";
import { AspectColorType, CollectionsActions } from "../../../../../../../../../models";
import { NodeLibCm } from "@mimirorg/typelibrary-types";
import { LibNodeIconContainer } from "./LibNodeElementIconComponent.styled";
import { Icon } from "../../../../../../../../../compLibrary/icon/Icon";
import { OnFavoriteClick } from "../favorite/handlers/OnFavoriteClick";
import { FavoriteComponent } from "../favorite/FavoriteComponent";
import { OnCheckboxChange, OnDragStart } from "./handlers";
import { LibNodeBox, LibNodeText } from "./LibNodeElement.styled";

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
 * Component for a LibNode element in a LibraryCategory drop-down menu.
 * @param interface
 * @returns a draggable LibNode element.
 */
export const LibNodeElement = ({
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

  return (
    <LibNodeBox
      onMouseEnter={() => setShowFavoriteButton(true)}
      onMouseLeave={() => setShowFavoriteButton(false)}
      active={selectedLibNode?.id === item.id}
      onClick={() => setSelectedLibNode(item)}
      draggable
      onDragStart={(event) => OnDragStart(event, JSON.stringify(item))}
      key={item.id}
      selectedColor={GetAspectColor(item, AspectColorType.Selected)}
      hoverColor={GetAspectColor(item, AspectColorType.Header)}
    >
      <LibNodeIconContainer color={GetAspectColor(item, AspectColorType.Main)}>
        <Icon size={20} src={item.symbol} alt="aspect color" draggable="false" />
      </LibNodeIconContainer>
      <LibNodeText>{item.name}</LibNodeText>

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
    </LibNodeBox>
  );
};
