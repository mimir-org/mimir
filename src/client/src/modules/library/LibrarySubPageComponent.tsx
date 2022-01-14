import { useState } from "react";
import { LibrarySubProjectItem } from "../../models";
import { CollapseIcon, ExpandIcon } from "../../assets/icons/chevron";
import { LibCategoryButton, LibCategoryHeader, LibElement } from "./styled";
import { Dispatch } from "redux";

interface Props {
  dispatch: Dispatch;
  subProjects?: LibrarySubProjectItem[];
}

const LibrarySubPageComponent = ({ subProjects }: Props) => {
  const [expanded, setExpanded] = useState(false);
  const expandIcon = expanded ? ExpandIcon : CollapseIcon;

  const onDragStart = (event, node) => {
    event.dataTransfer.setData("application/reactflow", node);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <>
      <LibCategoryButton onClick={() => setExpanded(!expanded)}>
        <LibCategoryHeader>Sub projects</LibCategoryHeader>
        <img className="expandIcon" src={expandIcon} alt="expand-icon" />
      </LibCategoryButton>
      {expanded &&
        subProjects?.map((node) => {
          return (
            <LibElement draggable={true} onDragStart={(event) => onDragStart(event, JSON.stringify(node))} key={node.id}>
              {node.name}
            </LibElement>
          );
        })}
    </>
  );
};

export default LibrarySubPageComponent;
