import { CloseIcon } from "../../assets/icons/close";
import { GetAspectColor, GetObjectIcon } from "../../helpers";
import { AspectColorType, LibItem, ObjectType } from "../../models";
import { LibraryCategory } from "../../models/project";
import { OnRemoveElementClick } from "./handlers";
import { SetNewSelectedElement, SetNewSelectedElementType } from "./helpers";
import { AddFavoriteBox, LibElement, LibElementIcon, RemoveFavoriteBox } from "./styled";

interface Props {
  node: LibItem;
  customCategory: LibraryCategory;
  selectedElement: string;
  setSelectedElement: any;
  setSelectedElementType: any;
  isCustomCategory: boolean;
  dispatch: any;
}

const LibraryCategoryElement = ({
  node,
  customCategory,
  selectedElement,
  setSelectedElement,
  setSelectedElementType,
  isCustomCategory,
  dispatch,
}: Props) => {
  const onDragStart = (event, item) => {
    event.dataTransfer.setData("application/reactflow", item);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <LibElement
      active={selectedElement === node.id}
      onClick={() => {
        SetNewSelectedElement(node, customCategory, dispatch, setSelectedElement);
        SetNewSelectedElementType(node.libraryType, setSelectedElementType);
      }}
      draggable={node.libraryType === ObjectType.ObjectBlock}
      onDragStart={(event) => node.libraryType === ObjectType.ObjectBlock && onDragStart(event, JSON.stringify(node))}
      key={node.id}
    >
      {node.name}
      <RemoveFavoriteBox visible={isCustomCategory} onClick={() => OnRemoveElementClick(dispatch, node)}>
        <img src={CloseIcon} alt="close" />
      </RemoveFavoriteBox>
      <AddFavoriteBox visible={!isCustomCategory} onClick={() => OnRemoveElementClick(dispatch, node)}>
        <img src={CloseIcon} alt="close" />
      </AddFavoriteBox>
      <LibElementIcon color={GetAspectColor(node, AspectColorType.Main, false)}>
        {(node.libraryType === ObjectType.Interface || node.libraryType === ObjectType.Transport) && (
          <img src={GetObjectIcon(node)} alt="aspect-icon" className="icon" draggable="false"></img>
        )}
      </LibElementIcon>
    </LibElement>
  );
};

export default LibraryCategoryElement;
