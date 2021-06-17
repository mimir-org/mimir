import red from "../../../../redux/store";
import { useState } from "react";
import { ExpandedIcon, ClosedIcon } from "../../../../assets/icons/common";
import { Node } from "../../../../models";
import { IsAspectNode } from "../../../flow/helpers/common";
import { AspectElement } from ".";
import { AspectBox } from "../../../../compLibrary/box/aspect";
import { Checkbox, CheckboxBlock } from "../checkboxComponent";
import { IsBlockView } from "../../../flow/helpers/block";
import {
  GetAspectIcon,
  GetAspectColor,
  SetIndentLevel,
  GetAspectType,
} from "../../../../assets/helpers";

interface Props {
  node: Node;
  label: string;
}
export const AspectComponent = ({ node, label }: Props) => {
  const [expanded, setExpanded] = useState(true);
  const expandIcon = expanded ? ExpandedIcon : ClosedIcon;
  const aspectIcon = GetAspectIcon(node);
  const color = GetAspectColor(node, true);
  const childType = GetAspectType(node);
  const nodes = red.store.getState().projectState.project.nodes;
  const children = nodes.filter((node) => !IsAspectNode(node));

  const handleExpandClick = () => {
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
          onClick={handleExpandClick}
        ></img>
      </AspectBox>
      {expanded &&
        children.map((node) => {
          if (node.type === childType) {
            const indent = node.level ?? SetIndentLevel(node, 0);
            return (
              <AspectElement
                key={node.id}
                node={node}
                label={node.label ?? node.name}
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
