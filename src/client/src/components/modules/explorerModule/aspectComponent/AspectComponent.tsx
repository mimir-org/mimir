import { useState } from "react";
import { ExpandedIcon, ClosedIcon } from "../../../../assets/icons";
import { NodeType, VIEW_TYPE } from "../../../../models/project";
import { IsAspectNode, GetNodes, GetEdges } from "../../../flow/helpers";
import { AspectElement } from ".";
import { AspectBox } from "../../../../componentLibrary/box/aspect";
import { CheckView } from "../../../../redux/store/localStorage/";
import { Checkbox, CheckboxBlock } from "../checkboxComponent";
import {
  GetAspectIcon,
  GetAspectColor,
  SetIndentLevel,
  GetAspectType,
  GetDropdownIcon,
} from "../../../../assets/helpers";

interface Props {
  nodeId: string;
  name: string;
  aspectType: NodeType;
}

export const AspectComponent = ({ nodeId, name, aspectType }: Props) => {
  const [expanded, setExpanded] = useState(true);
  const aspectIcon = GetAspectIcon(aspectType);
  const color = GetAspectColor(aspectType, true);
  const expandIcon = expanded ? ExpandedIcon : ClosedIcon;
  const childType = GetAspectType(aspectType);
  const nodes = GetNodes();
  const edges = GetEdges();
  const children = nodes.filter((node) => !IsAspectNode(node.type));
  const isBlockView = CheckView(VIEW_TYPE.BLOCKVIEW);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <AspectBox color={color}>
        <img src={aspectIcon} alt="aspect-icon"></img>
        <div className="checkbox_container">
          {!isBlockView ? (
            <Checkbox nodeId={nodeId} inputLabel={name} type={childType} />
          ) : (
            <CheckboxBlock nodeId={nodeId} inputLabel={name} />
          )}
        </div>
        {GetDropdownIcon(expandIcon, handleExpandClick)}
      </AspectBox>
      {expanded &&
        children.map((obj: object, i: number) => {
          if (children[i].type === childType) {
            const indent = SetIndentLevel(children, edges, i);
            return (
              <AspectElement
                key={i}
                nodeId={obj["id"]}
                name={obj["name"]}
                type={childType}
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
