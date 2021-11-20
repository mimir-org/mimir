import { useState } from "react";
import { LibrarySubProjectItem } from "../../models";
import { ExpandIcon, CollapseIcon } from "../../assets/icons/chevron";
import { LibCategoryBox, LibCategoryHeader, LibElement } from "./styled";

interface Props {
  dispatch: any;
  subProjects?: LibrarySubProjectItem[];
}

const LibrarySubPageComponent = ({ dispatch, subProjects }: Props) => {
  const [expanded, setExpanded] = useState(false);
  const expandIcon = expanded ? ExpandIcon : CollapseIcon;

  const onDragStart = (event, node) => {
    event.dataTransfer.setData("application/reactflow", node);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <>
      <LibCategoryBox onClick={() => setExpanded(!expanded)}>
        <LibCategoryHeader>Sub projects</LibCategoryHeader>
        <img className="expandIcon" src={expandIcon} alt="expand-icon"></img>
      </LibCategoryBox>
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