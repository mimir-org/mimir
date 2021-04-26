import { useState } from "react";
import { expandedIcon, unexpandedIcon } from "../../../../assets";
import { NodeType } from "../../../../models/project";
import { GetEdges, GetNodes } from "../../../flow/helpers";
import { isAspectNode } from "../../../flow/utils";
import CheckboxComponent from "../checkboxComponent/CheckboxComponent";
import { AspectChildComponent } from "../aspectChildComponent";
import { GetAspectIcon, GetAspectHeader, SetIndentLevel } from "../helpers/";
import { AspectChildContainer } from "../styled";
import "./aspect.scss";

interface Props {
  nodeId: string;
  name: string;
  type: NodeType;
}

export const AspectComponent = ({ nodeId, name, type }: Props) => {
  const [expanded, setExpanded] = useState(true);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const aspectIcon = GetAspectIcon(type);
  const aspectHeader = GetAspectHeader(type);
  const expandIcon = expanded ? expandedIcon : unexpandedIcon;

  const nodes = GetNodes();
  const children = nodes.filter((node) => !isAspectNode(node.type));
  const edges = GetEdges();

  const subType = type.substring(6) as NodeType;

  return (
    <div className="aspect_container">
      <div className={"aspect_header " + aspectHeader}>
        <img className="aspectIcon" src={aspectIcon} alt="aspect-icon"></img>
        <div className="checkbox_container">
          <CheckboxComponent nodeId={nodeId} inputLabel={name} type={subType} />
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
            if (children[i].type === subType) {
              const indent = SetIndentLevel(children, edges, i);

              return (
                <AspectChildComponent
                  key={i}
                  nodeId={obj["id"]}
                  name={obj["name"]}
                  type={subType}
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
