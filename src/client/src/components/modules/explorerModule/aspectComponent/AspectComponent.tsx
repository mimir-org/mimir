import "./aspect.scss";
import { useState } from "react";
import { expandedIcon, unexpandedIcon } from "../../../../assets";
import { NodeType } from "../../../../models/project";
import { IsAspectNode, GetNodes, GetEdges } from "../../../flow/helpers";
import CheckboxComponent from "../checkboxComponent/CheckboxComponent";
import { AspectChildComponent } from "../aspectChildComponent";
import { AspectChildContainer } from "../styled";
import {
  GetAspectIcon,
  GetAspectHeader,
  SetIndentLevel,
  GetType,
  GetDropdownIcon,
} from "../helpers/";

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
  const aspectHeader = GetAspectHeader(aspectType);
  const expandIcon = expanded ? expandedIcon : unexpandedIcon;
  const childType = GetType(aspectType);
  const nodes = GetNodes();
  const edges = GetEdges();
  const children = nodes.filter((node) => !IsAspectNode(node.type));

  return (
    <div className="aspect_container">
      <div className={"aspect_header " + aspectHeader}>
        <img className="aspectIcon" src={aspectIcon} alt="aspect-icon"></img>
        <div className="checkbox_container">
          <CheckboxComponent
            nodeId={nodeId}
            inputLabel={name}
            type={childType}
          />
        </div>
        {GetDropdownIcon(expandIcon, handleExpandClick)}
      </div>

      <AspectChildContainer color={childType}>
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
      </AspectChildContainer>
    </div>
  );
};

export default AspectComponent;
