import { useState } from "react";
import { LibCategory } from "../../../models/project";
import { GetAspectColor } from "../../../assets/helpers";
import { ExpandedIcon, ClosedIcon } from "../../../assets/icons/common";
import {
  LibraryCategory,
  LibraryCategoryElement,
  LibraryElement,
  LibraryElementIcon,
} from "../../../compLibrary/box/library";

interface Props {
  category: LibCategory;
}

const LibraryCategoryComponent = ({ category }: Props) => {
  const [expanded, setExpanded] = useState(false);

  const onDragStart = (event, node) => {
    event.dataTransfer.setData("application/reactflow", node);
    event.dataTransfer.effectAllowed = "move";
  };

  const expandIcon = expanded ? ExpandedIcon : ClosedIcon;

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
              onDragStart={(event) => onDragStart(event, JSON.stringify(node))}
              key={node.id}
              draggable
            >
              {node.name}
              <LibraryElementIcon color={GetAspectColor(node, false)} />
            </LibraryElement>
          );
        })}
    </>
  );
};

export default LibraryCategoryComponent;
