import { useState } from "react";
import { ExpandedIcon, ClosedIcon } from "../../../../assets/icons/common";
import { Node, Project } from "../../../../models";
import { IsAspectNode } from "../../../flow/helpers/common";
import { AspectElement } from ".";
import { AspectBox } from "../../../../compLibrary/box/aspect";
import { Checkbox, CheckboxBlock } from "../checkboxComponent";
import { IsBlockView } from "../../../flow/helpers/block";
import {
  GetAspectIcon,
  GetAspectColor,
  SetIndentLevel,
} from "../../../../assets/helpers";

interface Props {
  node: Node;
  label: string;
  project: Project;
}
export const AspectComponent = ({ node, label, project }: Props) => {
  const [expanded, setExpanded] = useState(true);
  const expandIcon = expanded ? ExpandedIcon : ClosedIcon;
  const aspectIcon = GetAspectIcon(node);
  const color = GetAspectColor(node, true);
  const nodes = project.nodes;
  const children = nodes.filter((x) => !IsAspectNode(x)) ?? [];

  const onExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <AspectBox color={color}>
        <img src={aspectIcon} alt="aspect-icon" className="icon"></img>
        <div className="checkbox_container">
          {IsBlockView() ? (
            <CheckboxBlock node={node} inputLabel={label} />
          ) : (
            <Checkbox node={node} inputLabel={label} />
          )}
        </div>
        <img
          className="expandIcon"
          src={expandIcon}
          alt="expand-icon"
          onClick={onExpandClick}
        ></img>
      </AspectBox>
      {expanded &&
        children.map((elem) => {
          if (elem.aspect === node.aspect) {
            const indent = elem.level ?? SetIndentLevel(elem, 0, project);
            return (
              <AspectElement
                key={elem.id}
                node={elem}
                label={elem.label ?? elem.name}
                indent={indent}
              />
            );
          }
          return null;
        })}
    </>
  );
};

export default AspectComponent;
