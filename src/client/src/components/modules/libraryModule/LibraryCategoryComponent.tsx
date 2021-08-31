import { useState } from "react";
import { LibCategory } from "../../../models/project";
import { ObjectType } from "../../../models";
import { GetObjectIcon, GetAspectColor } from "../../../assets/helpers";
import { ExpandIcon, CollapseIcon } from "../../../assets/icons/common";
import {
  LibraryCategory,
  LibraryCategoryElement,
  LibraryElement,
  LibraryElementIcon,
} from "../../../compLibrary/box/library";

interface Props {
  category: LibCategory;
  selectedElement: string;
  setSelectedElement: any;
  setSelectedElementType: any;
}

const LibraryCategoryComponent = ({
  category,
  selectedElement,
  setSelectedElement,
  setSelectedElementType,
}: Props) => {
  const [expanded, setExpanded] = useState(false);
  const expandIcon = expanded ? ExpandIcon : CollapseIcon;

  const onDragStart = (event, node) => {
    event.dataTransfer.setData("application/reactflow", node);
    event.dataTransfer.effectAllowed = "move";
  };

  const setNewSelectedElement = (id: string) => {
    setSelectedElement(id);
  };

  const setNewSelectedElementType = (libraryType: ObjectType) => {
    setSelectedElementType(libraryType);
  };

  return (
    <>
      <LibraryCategory onClick={() => setExpanded(!expanded)}>
        <LibraryCategoryElement>{category.name}</LibraryCategoryElement>
        <img className="expandIcon" src={expandIcon} alt="expand-icon"></img>
      </LibraryCategory>
      {expanded &&
        category?.nodes.map((node) => {
          return (
            <LibraryElement
              active={selectedElement === node.id}
              onClick={() => {
                setNewSelectedElement(node.id);
                setNewSelectedElementType(node.libraryType);
              }}
              draggable={node.libraryType === ObjectType.ObjectBlock}
              onDragStart={(event) =>
                node.libraryType === ObjectType.ObjectBlock &&
                onDragStart(event, JSON.stringify(node))
              }
              key={node.id}
            >
              {node.name}
              <LibraryElementIcon color={GetAspectColor(node, false)}>
                {(node.libraryType === ObjectType.Interface ||
                  node.libraryType === ObjectType.Transport) && (
                  <img
                    src={GetObjectIcon(node)}
                    alt="aspect-icon"
                    className="icon"
                    draggable="false"
                  ></img>
                )}
              </LibraryElementIcon>
            </LibraryElement>
          );
        })}
    </>
  );
};

export default LibraryCategoryComponent;
