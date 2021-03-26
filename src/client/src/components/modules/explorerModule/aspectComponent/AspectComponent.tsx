import { FunctionIcon, ProductIcon, LocationIcon } from "../../../../assets";
import CheckboxComponent from "../checkboxComponent/CheckboxComponent";
import FacetComponent from "../facetComponent/FacetComponent";
import "./aspect.scss";

interface AspectComponentProps {
  id: string;
  name: string;
  facet: object[];
}

export const AspectComponent = ({ id, name, facet }: AspectComponentProps) => {
  const Icon =
    id === "1"
      ? FunctionIcon
      : id === "2"
      ? LocationIcon
      : id === "3"
      ? ProductIcon
      : null;
  return (
    <div className="aspect_container">
      <div className="aspect_header">
        <img className="aspectIcon" src={Icon} alt="aspect-icon"></img>
        <CheckboxComponent id={id} inputLabel={name} />
      </div>
      <div className="facets_container">
        {facet.map(function (f, index) {
          return <FacetComponent key={index} id={f["id"]} name={f["name"]} />;
        })}
      </div>
    </div>
  );
};

export default AspectComponent;
