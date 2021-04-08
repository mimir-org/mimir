import { useState } from "react";
import { expandedIcon, unexpandedIcon } from "../../../../assets";
import { GetEdgesFromState, GetNodesFromState } from "../../../flow/helpers";
import CheckboxComponent from "../checkboxComponent/CheckboxComponent";
import FacetComponent from "../facetComponent/FacetComponent";
import { GetAspectIcon, GetAspectHeader } from "../helpers/";
import "./aspect.scss";

interface Props {
  nodeId: string;
  name: string;
  type: string;
}

export const AspectComponent = ({ nodeId, name, type }: Props) => {
  const [expanded, setExpanded] = useState(true);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const aspectIcon = GetAspectIcon(name);
  const aspectHeader = GetAspectHeader(name);
  const expandIcon = expanded ? expandedIcon : unexpandedIcon;

  const aspects = GetNodesFromState();
  const facets = aspects.slice(3);

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
            isParent={true}
            type={type}
          />
        </div>
        <div className="placeholder_container">
          <p>Placeholder</p>
        </div>
        <img
          className="expandIcon"
          src={expandIcon}
          alt="expand-icon"
          onClick={() => handleExpandClick()}
        ></img>
      </div>
      {expanded && name === "Function" && (
        <div className="facets_container">
          {facets.map((obj, i) => {
            if (facets[i].type === "Function") {
              return (
                <FacetComponent
                  key={i}
                  edgeId={undefined}
                  nodeId={obj["id"]}
                  name={obj["name"]}
                  aspect={name}
                />
              );
            }
            return null;
          })}
        </div>
      )}
      {expanded && name === "Product" && (
        <div className="facets_container">
          {facets.map((obj, i) => {
            if (facets[i].type === "Product") {
              return (
                <FacetComponent
                  key={i}
                  edgeId={undefined}
                  nodeId={obj["id"]}
                  name={obj["name"]}
                  aspect={name}
                />
              );
            }
            return null;
          })}
        </div>
      )}
      {expanded && name === "Location" && (
        <div className="facets_container">
          {facets.map((obj, i) => {
            if (facets[i].type === "Location") {
              return (
                <FacetComponent
                  key={i}
                  edgeId={undefined}
                  nodeId={obj["id"]}
                  name={obj["name"]}
                  aspect={name}
                />
              );
            }
            return null;
          })}
        </div>
      )}
    </div>
  );
};

export default AspectComponent;
