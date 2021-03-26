import "./facility.scss";
import AspectComponent from "../aspectComponent/AspectComponent";
import CheckboxComponent from "../checkboxComponent/CheckboxComponent";

interface FacilityComponentProps {
  name: string;
  id: string;
  checked?: boolean;
  aspect: object[];
}

export const FacilityComponent = ({
  name,
  id,
  checked,
  aspect,
}: FacilityComponentProps) => {
  return (
    <div className="facility_container">
      <div className="facility_header">
        <CheckboxComponent id={id} inputLabel={name} checked={checked} />
      </div>
      <div className="aspects_container">
        {aspect.map(function (a, index) {
          return (
            <AspectComponent
              key={index}
              id={a["id"]}
              name={a["name"]}
              facet={a["facet"]}
            />
          );
        })}
      </div>
    </div>
  );
};

export default FacilityComponent;
