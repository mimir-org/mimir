import { useState } from "react";
import { ExpandIcon, CollapseIcon } from "../../../assets/icons/common";
import { Node, Project } from "../../../models";
import { IsAspectNode } from "../../../components/flow/helpers/common";
import { AspectElement } from ".";
import { AspectBox } from "../../../compLibrary/box/aspect";
import { Checkbox, CheckboxBlock } from "../checkboxComponent";
import { IsBlockView } from "../../../components/flow/helpers/block";
import { OnExpandClick } from "../handlers";
import {
  GetAspectIcon,
  GetAspectColor,
  SetIndentLevel,
} from "../../../assets/helpers";

interface Props {
  node: Node;
  label: string;
  project: Project;
}
export const AspectComponent = ({ node, label, project }: Props) => {
  const [expanded, setExpanded] = useState(true);
  const expandIcon = expanded ? ExpandIcon : CollapseIcon;
  const aspectIcon = GetAspectIcon(node);
  const color = GetAspectColor(node, true);
  const nodes = project.nodes;
  const children = nodes.filter((x) => !IsAspectNode(x)) ?? [];

  return (
    <>
      <AspectBox color={color}>
        <img src={aspectIcon} alt="aspect-icon" className="icon"></img>
        <div className="checkbox_container">
          {IsBlockView() ? (
            <CheckboxBlock node={node} inputLabel={label} />
          ) : (
            <Checkbox node={node} project={project} inputLabel={label} />
          )}
        </div>
        <img
          className="expandIcon"
          src={expandIcon}
          alt="expand-icon"
          onClick={() => OnExpandClick(setExpanded, expanded)}
        ></img>
      </AspectBox>
      {expanded &&
        children.map((elem) => {
          if (elem.aspect === node.aspect) {
            const indent = elem.level ?? SetIndentLevel(elem, 0);
            return (
              <AspectElement
                key={elem.id}
                node={elem}
                label={elem.label ?? elem.name}
                indent={indent}
                project={project}
              />
            );
          }
          return null;
        })}
    </>
  );
};

export default AspectComponent;
