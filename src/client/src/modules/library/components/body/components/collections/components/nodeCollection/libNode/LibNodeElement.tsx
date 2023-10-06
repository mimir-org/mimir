import { Color } from "../../../../../../../../../assets/color/Color";
import { Checkbox } from "../../../../../../../../../compLibrary/input/checkbox/common/Checkbox";
import { LibraryCategory } from "../../../../../../../../../models/project";
import { CollectionsActions } from "../../../../../../../../../models";
import { BlockLibCm } from "@mimirorg/typelibrary-types";
import { LibNodeIconContainer } from "./LibNodeElementIconComponent.styled";
import { OnCheckboxChange, OnDragStart } from "./handlers";
import { LibNodeBox, LibNodeText } from "./LibNodeElement.styled";
import { Icon, useMimirorgTheme } from "@mimirorg/component-library";
import { AspectColor } from "lib";

interface Props {
  libNode: BlockLibCm;
  selectedLibNode: BlockLibCm;
  setSelectedLibNode: (value: BlockLibCm) => void;
  selectedLibNodes: BlockLibCm[];
  setSelectedLibNodes: (array: BlockLibCm[]) => void;
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
  const theme = useMimirorgTheme();
  const isLibNodeSelected = selectedLibNodes.some((n) => n.id === libNode.id);
  const isManageType = collectionState === CollectionsActions.ManageType;

  const aspectColor = new AspectColor();
  aspectColor.resolveColors(theme, libNode.aspect);

  return (
    <LibNodeBox
      active={selectedLibNode?.id === libNode.id}
      onClick={() => setSelectedLibNode(libNode)}
      onDragStart={(event) => OnDragStart(event, JSON.stringify(libNode))}
      key={libNode.id}
      selectedColor={aspectColor.selectedColor}
      hoverColor={aspectColor.headerColor}
      draggable
    >
      <LibNodeIconContainer color={aspectColor.mainColor}>
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
