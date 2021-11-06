import { useState } from "react";
import { LibraryCategory } from "../../models/project";
import { AspectColorType, ObjectType } from "../../models";
import { ExpandIcon, CollapseIcon } from "../../assets/icons/chevron";
import { SetNewSelectedElement, SetNewSelectedElementType } from "./helpers";
import { CloseIcon } from "../../assets/icons/close";
import { OnCloseElementClick } from "./handlers";
import { LibCategory, LibCategoryElement, LibElement, LibElementClose, LibElementIcon } from "../../compLibrary/box/library";
import { GetAspectColor, GetObjectIcon } from "../../helpers";

interface Props {
  customCategory: LibraryCategory;
  category: LibraryCategory;
  selectedElement: string;
  setSelectedElement: any;
  setSelectedElementType: any;
  dispatch: any;
}

const LibraryCategoryComponent = ({
  category,
  customCategory,
  selectedElement,
  setSelectedElement,
  setSelectedElementType,
  dispatch,
}: Props) => {
  const [expanded, setExpanded] = useState(false);
  const expandIcon = expanded ? ExpandIcon : CollapseIcon;

  const onDragStart = (event, node) => {
    event.dataTransfer.setData("application/reactflow", node);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <>
      <LibCategory onClick={() => setExpanded(!expanded)}>
        <LibCategoryElement>{category.name}</LibCategoryElement>
        <img className="expandIcon" src={expandIcon} alt="expand-icon"></img>
      </LibCategory>
      {expanded &&
        category?.nodes.map((node) => {
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
              <LibElementIcon color={GetAspectColor(node, AspectColorType.Main, true)}>
                {(node.libraryType === ObjectType.Interface || node.libraryType === ObjectType.Transport) && (
                  <img src={GetObjectIcon(node)} alt="aspect-icon" className="icon" draggable="false"></img>
                )}
              </LibElementIcon>
              <LibElementClose visible={customCategory.nodes.includes(node)} onClick={() => OnCloseElementClick(dispatch, node)}>
                <img src={CloseIcon} alt="close" />
              </LibElementClose>
            </LibElement>
          );
        })}
    </>
  );
};

export default LibraryCategoryComponent;
