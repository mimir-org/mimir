import { useState } from "react";
import { ExpandedIcon, ClosedIcon } from "../../../../assets/icons/common";
import { Node } from "../../../../models/project";
import { IsAspectNode } from "../../../flow/helpers/common";
import { AspectElement } from ".";
import { AspectBox } from "../../../../componentLibrary/box/aspect";
import { Checkbox, CheckboxBlock } from "../checkboxComponent";
import red from "../../../../redux/store";
import { IsBlockView } from "../../../flow/helpers/block";
import {
  GetAspectIcon,
  GetAspectColor,
  SetIndentLevel,
  GetAspectType,
  GetDropdownIcon,
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
        <img src={aspectIcon} alt="aspect-icon"></img>
        <div className="checkbox_container">
          {IsBlockView() ? (
            <CheckboxBlock node={node} inputLabel={label} />
          ) : (
            <Checkbox node={node} inputLabel={label} />
          )}
        </div>
        {GetDropdownIcon(expandIcon, handleExpandClick)}
      </AspectBox>
      {expanded &&
        children.map((_, i: number) => {
          if (children[i].type === childType) {
            const indent = children[i].level ?? SetIndentLevel(children[i], 0);
            return (
              <AspectElement
                key={i}
                node={children[i]}
                label={children[i].label ?? children[i].name}
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
