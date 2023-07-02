import { Color } from "../../../../../../../../../assets/color/Color";
import { Checkbox } from "../../../../../../../../../compLibrary/input/checkbox/common/Checkbox";
import { LibraryCategory } from "../../../../../../../../../models/project";
import { GetAspectColor } from "assets";
import { AspectColorType, CollectionsActions } from "../../../../../../../../../models";
import { AspectObjectLibCm } from "@mimirorg/typelibrary-types";
import { LibNodeIconContainer } from "./LibNodeElementIconComponent.styled";
import { OnCheckboxChange, OnDragStart } from "./handlers";
import { LibNodeBox, LibNodeText } from "./LibNodeElement.styled";
import { Icon } from "@mimirorg/component-library";

interface Props {
  libNode: AspectObjectLibCm;
  selectedLibNode: AspectObjectLibCm;
  setSelectedLibNode: (value: AspectObjectLibCm) => void;
  selectedLibNodes: AspectObjectLibCm[];
  setSelectedLibNodes: (array: AspectObjectLibCm[]) => void;
  collectionState: CollectionsActions;
}

/**
 * Component for a LibNode element in a LibraryCategory drop-down menu.
 * @param interface
 * @returns a draggable LibNode element.
 */
export const LibNodeElement = ({
  libNode,
  selectedLibNode,
  setSelectedLibNode,
  selectedLibNodes,
  setSelectedLibNodes,
  collectionState,
}: Props) => {
  const isLibNodeSelected = selectedLibNodes.some((n) => n.id === libNode.id);
  const isManageType = collectionState === CollectionsActions.ManageType;

  return (
    <LibNodeBox
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
    </LibNodeBox>
  );
};
