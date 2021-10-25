import { useState } from "react";
import { LibraryCategory } from "../../models/project";
import { ObjectType } from "../../models";
import { GetObjectIcon, GetAspectColor } from "../../assets/helpers";
import { ExpandIcon, CollapseIcon } from "../../assets/icons/chevron";
import { LibCategory, LibCategoryElement, LibElement, LibElementIcon } from "../../compLibrary/box/library";

interface Props {
  category: LibraryCategory;
  selectedElement: string;
  setSelectedElement: any;
  setSelectedElementType: any;
}

const LibraryCategoryComponent = ({ category, selectedElement, setSelectedElement, setSelectedElementType }: Props) => {
  const [expanded, setExpanded] = useState(false);
  const expandIcon = expanded ? ExpandIcon : CollapseIcon;

  const onDragStart = (event, node) => {
    event.dataTransfer.setData("application/reactflow", node);
    event.dataTransfer.effectAllowed = "move";
  };

  const setNewSelectedElement = (id: string) => setSelectedElement(id);
  const setNewSelectedElementType = (libraryType: ObjectType) => setSelectedElementType(libraryType);

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
                setNewSelectedElement(node.id);
                setNewSelectedElementType(node.libraryType);
              }}
              draggable={node.libraryType === ObjectType.ObjectBlock}
              onDragStart={(event) => node.libraryType === ObjectType.ObjectBlock && onDragStart(event, JSON.stringify(node))}
              key={node.id}
            >
              {node.name}
              <LibElementIcon color={GetAspectColor(node, false)}>
                {(node.libraryType === ObjectType.Interface || node.libraryType === ObjectType.Transport) && (
                  <img src={GetObjectIcon(node)} alt="aspect-icon" className="icon" draggable="false"></img>
                )}
              </LibElementIcon>
            </LibElement>
          );
        })}
    </>
  );
};

export default LibraryCategoryComponent;
