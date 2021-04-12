import { useState } from "react";
import { expandedIcon, unexpandedIcon } from "../../../../assets";
import { NODE_TYPE } from "../../../../models/project";
import { GetEdges, GetNodes } from "../../../flow/helpers";
import { isAspectNode } from "../../../flow/utils";
import CheckboxComponent from "../checkboxComponent/CheckboxComponent";
import FacetComponent from "../facetComponent/FacetComponent";
import { GetAspectIcon, GetAspectHeader, SetIndentLevel } from "../helpers/";
import { FacetContainerWrapper } from "../styled";
import "./aspect.scss";

interface Props {
  nodeId: string;
  name: typeof NODE_TYPE;
  type: typeof NODE_TYPE;
}

export const AspectComponent = ({ nodeId, name, type }: Props) => {
  const [expanded, setExpanded] = useState(true);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const aspectIcon = GetAspectIcon(name.toString());
  const aspectHeader = GetAspectHeader(name.toString());
  const expandIcon = expanded ? expandedIcon : unexpandedIcon;

  const nodes = GetNodes();
  const facets = nodes.filter((node) => !isAspectNode(node.type));
  const edges = GetEdges();

  return (
    <div className="aspect_container">
      <div className={"aspect_header " + aspectHeader}>
        <img className="aspectIcon" src={aspectIcon} alt="aspect-icon"></img>
        <div className="checkbox_container">
          <CheckboxComponent
            nodeId={nodeId}
            inputLabel={name}
            aspect={name}
            type={type}
          />
        </div>
        <img
          className="expandIcon"
          src={expandIcon}
          alt="expand-icon"
          onClick={() => handleExpandClick()}
        ></img>
      </div>
      <FacetContainerWrapper color={name}>
        {expanded &&
          facets.map((obj: object, i: number) => {
            if (facets[i].type === type) {
              const indent = SetIndentLevel(facets, edges, i);

              return (
                <FacetComponent
                  key={i}
                  nodeId={obj["id"]}
                  name={obj["name"]}
                  aspect={name}
                  type={type}
                  indent={indent}
                />
              );
            }
            return null;
          })}
      </FacetContainerWrapper>
    </div>
  );
};

export default AspectComponent;
