import { useState } from "react";
import { expandedIcon, unexpandedIcon } from "../../../../assets";
import { NODE_TYPE } from "../../../../models/project";
import { GetNodesFromState } from "../../../flow/helpers";
import CheckboxComponent from "../checkboxComponent/CheckboxComponent";
import FacetComponent from "../facetComponent/FacetComponent";
import { GetAspectIcon, GetAspectHeader } from "../helpers/";
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

  const nodes = GetNodesFromState();
  const facets = nodes.filter((node) => node.type !== NODE_TYPE.ASPECT);

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
            if (facets[i].type === name) {
              return (
                <FacetComponent
                  key={i}
                  nodeId={obj["id"]}
                  name={obj["name"]}
                  aspect={name}
                  type={type}
                  margin="85" // TODO: fix dynamic indentation
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
