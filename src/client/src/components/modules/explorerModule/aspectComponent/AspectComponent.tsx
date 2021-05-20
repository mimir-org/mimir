import { useState } from "react";
import { ExpandedIcon, ClosedIcon } from "../../../../assets/icons";
import { NodeType, VIEW_TYPE } from "../../../../models/project";
import { IsAspectNode } from "../../../flow/helpers";
import { AspectElement } from ".";
import { AspectBox } from "../../../../componentLibrary/box/aspect";
import { CheckView } from "../../../../redux/store/localStorage/";
import { Checkbox, CheckboxBlock } from "../checkboxComponent";
import store from "../../../../redux/store";
import {
  GetAspectIcon,
  GetAspectColor,
  SetIndentLevel,
  GetAspectType,
  GetDropdownIcon,
} from "../../../../assets/helpers";

interface Props {
  nodeId: string;
  label: string;
  aspectType: NodeType;
}
export const AspectComponent = ({ nodeId, label, aspectType }: Props) => {
  const [expanded, setExpanded] = useState(true);
  const expandIcon = expanded ? ExpandedIcon : ClosedIcon;
  const aspectIcon = GetAspectIcon(aspectType);
  const color = GetAspectColor(aspectType, true);
  const childType = GetAspectType(aspectType);
  const nodes = store.getState().projectState.project.nodes;
  const edges = store.getState().projectState.project.edges;
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
          {isBlockView ? (
            <CheckboxBlock nodeId={nodeId} inputLabel={label} />
          ) : (
            <Checkbox nodeId={nodeId} inputLabel={label} type={childType} />
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
                label={obj["label"] ?? obj["name"]}
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
