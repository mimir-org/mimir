import { useState } from "react";
import {
  FunctionIcon,
  ProductIcon,
  LocationIcon,
  expandedIcon,
  unexpandedIcon,
} from "../../../../assets";
import CheckboxComponent from "../checkboxComponent/CheckboxComponent";
import FacetComponent from "../facetComponent/FacetComponent";
import "./aspect.scss";

interface AspectComponentProps {
  id: string;
  name: string;
  facet: object[];
}

export const AspectComponent = ({ id, name, facet }: AspectComponentProps) => {
  const [expanded, setExpanded] = useState(true);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const aspectIcon =
    id === "1"
      ? FunctionIcon
      : id === "2"
      ? LocationIcon
      : id === "3"
      ? ProductIcon
      : null;

  const expandIcon = expanded ? expandedIcon : unexpandedIcon;

  return (
    <div className="aspect_container">
      <div className="aspect_header">
        <img className="aspectIcon" src={aspectIcon} alt="aspect-icon"></img>
        <div className="checkbox_container">
          <CheckboxComponent id={id} inputLabel={name} aspect={name} />
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
      {expanded && (
        <div className="facets_container">
          {facet.map(function (f, index) {
            return (
              <FacetComponent
                key={index}
                id={f["id"]}
                name={f["name"]}
                aspect={name}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AspectComponent;
