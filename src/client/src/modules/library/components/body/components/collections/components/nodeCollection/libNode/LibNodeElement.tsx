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
  libNode: NodeLibCm;
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
  libNode,
  customCategory,
  selectedLibNode,
  setSelectedLibNode,
  selectedLibNodes,
  setSelectedLibNodes,
  collectionState,
  dispatch,
}: Props) => {
  const [showFavoriteButton, setShowFavoriteButton] = useState(false);
  const isLibNodeSelected = selectedLibNodes.some((n) => n.id === libNode.id);
  const isLibNodeFavorite = customCategory.nodes?.find((n) => n.id === libNode.id);
  const isManageType = collectionState === CollectionsActions.ManageType;
  const addNewFavorite = showFavoriteButton && !isLibNodeFavorite;

  return (
    <LibNodeBox
      onMouseEnter={() => setShowFavoriteButton(true)}
      onMouseLeave={() => setShowFavoriteButton(false)}
      active={selectedLibNode?.id === libNode.id}
      onClick={() => setSelectedLibNode(libNode)}
      onDragStart={(event) => OnDragStart(event, JSON.stringify(libNode))}
      key={libNode.id}
      selectedColor={GetAspectColor(libNode, AspectColorType.Selected)}
      hoverColor={GetAspectColor(libNode, AspectColorType.Header)}
      draggable
    >
      <LibNodeIconContainer color={GetAspectColor(libNode, AspectColorType.Main)}>
        <Icon size={20} src={libNode.symbol} alt="aspect color" draggable="false" />
      </LibNodeIconContainer>
      <LibNodeText>{libNode.name}</LibNodeText>

      {isManageType && (
        <Checkbox
          isChecked={isLibNodeSelected}
          onChange={() => OnCheckboxChange(libNode, selectedLibNodes, setSelectedLibNodes, isLibNodeSelected)}
          color={Color.BLACK}
        />
      )}
      {showFavoriteButton && (
        <FavoriteComponent addNewFavorite={addNewFavorite} onClick={() => OnFavoriteClick(libNode, addNewFavorite, dispatch)} />
      )}
    </LibNodeBox>
  );
};
