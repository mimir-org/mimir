import { useState } from "react";
import { expandedIcon, unexpandedIcon } from "../../../../assets";
import { NODE_TYPE } from "../../../../models/project";
import { GetEdgesFromState, GetNodesFromState } from "../../../flow/helpers";
import CheckboxComponent from "../checkboxComponent/CheckboxComponent";
import FacetComponent from "../facetComponent/FacetComponent";
import { GetAspectIcon, GetAspectHeader } from "../helpers/";
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

  // Find edges that are linked to the node
  const edges = GetEdgesFromState();
  const edge = edges.find((edge) => edge.fromNode === nodeId);
  const edgeId = edge === undefined ? undefined : edge.id;

  return (
    <div className="aspect_container">
      <div className={"aspect_header " + aspectHeader}>
        <img className="aspectIcon" src={aspectIcon} alt="aspect-icon"></img>
        <div className="checkbox_container">
          <CheckboxComponent
            nodeId={nodeId}
            edgeId={edgeId}
            inputLabel={name}
            aspect={name}
            isAspect={true}
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
      <div className="facets_container">
        {expanded &&
          facets.map((obj: object, i: number) => {
            if (facets[i].type === name) {
              return (
                <FacetComponent
                  key={i}
                  edgeId={undefined}
                  nodeId={obj["id"]}
                  name={obj["name"]}
                  aspect={name}
                  margin="85" // TODO: fix dynamic indentation
                />
              );
            }
            return null;
          })}
      </div>
    </div>
  );
};

export default AspectComponent;
