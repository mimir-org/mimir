import { useState } from "react";
import { useSelector } from "react-redux";
import { expandedIcon, unexpandedIcon } from "../../../../assets";
import { RootState } from "../../../../redux/store";
import CheckboxComponent from "../checkboxComponent/CheckboxComponent";
import FacetComponent from "../facetComponent/FacetComponent";
import { GetAspectIcon, GetAspectHeader } from "../helpers/";
import "./aspect.scss";

interface Props {
  id: string;
  name: string;
}

export const AspectComponent = ({ id, name }: Props) => {
  const [expanded, setExpanded] = useState(true);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const aspectIcon = GetAspectIcon(name);
  const aspectHeader = GetAspectHeader(name);
  const expandIcon = expanded ? expandedIcon : unexpandedIcon;

  const aspects: any = useSelector<RootState>(
    (state) => state.projectState.project.nodes
  );
  let facets: any[] = [];
  facets.push(aspects[3]);
  facets.push(aspects[4]);

  return (
    <div className="aspect_container">
      <div className={"aspect_header " + aspectHeader}>
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
      {expanded && name === "Function" && (
        <div className="facets_container">
          {facets.map((obj, i) => {
            return (
              <FacetComponent
                key={i}
                id={obj["id"]}
                name={obj["name"]}
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
