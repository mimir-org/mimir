import { useState } from "react";
import { ExpandedIcon, ClosedIcon } from "../../../../assets/icons";
import { NodeType } from "../../../../models/project";
import { IsAspectNode, GetNodes, GetEdges } from "../../../flow/helpers";
import CheckboxComponent from "../checkboxComponent/CheckboxComponent";
import { AspectChildComponent } from "./";
import { AspectBox } from "../../../../componentLibrary/box/aspect";
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
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const aspectIcon = GetAspectIcon(aspectType);
  const color = GetAspectColor(aspectType);
  const expandIcon = expanded ? ExpandedIcon : ClosedIcon;
  const childType = GetAspectType(aspectType);
  const nodes = GetNodes();
  const edges = GetEdges();
  const children = nodes.filter((node) => !IsAspectNode(node.type));

  return (
    <>
      <AspectBox color={color}>
        <img src={aspectIcon} alt="aspect-icon"></img>
        <div className="checkbox_container">
          <CheckboxComponent
            nodeId={nodeId}
            inputLabel={name}
            type={childType}
          />
        </div>
        {GetDropdownIcon(expandIcon, handleExpandClick)}
      </AspectBox>

      {expanded &&
        children.map((obj: object, i: number) => {
          if (children[i].type === childType) {
            const indent = SetIndentLevel(children, edges, i);
            return (
              <AspectChildComponent
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
