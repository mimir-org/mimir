import { useState } from "react";
import { expandedIcon, unexpandedIcon } from "../../../../assets";
import { NodeType } from "../../../../models/project";
import { GetEdges, GetNodes } from "../../../flow/helpers";
import { isAspectNode } from "../../../flow/utils";
import CheckboxComponent from "../checkboxComponent/CheckboxComponent";
import { AspectChildComponent } from "../aspectChildComponent";
import {
  GetAspectIcon,
  GetAspectHeader,
  SetIndentLevel,
  GetType,
} from "../helpers/";
import { AspectChildContainer } from "../styled";
import "./aspect.scss";

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

  const nodes = GetNodes();
  const children = nodes.filter((node) => !isAspectNode(node.type));
  const edges = GetEdges();
  const childType = GetType(aspectType);

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
        <img
          className="expandIcon"
          src={expandIcon}
          alt="expand-icon"
          onClick={() => handleExpandClick()}
        ></img>
      </div>
      <AspectChildContainer color={name}>
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
