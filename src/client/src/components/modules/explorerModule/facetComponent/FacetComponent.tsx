import CheckboxComponent from "../checkboxComponent/CheckboxComponent";
import "./facet.scss";

interface FacetComponentProps {
  id: string;
  name: string;
}

export const FacetComponent = ({ id, name }: FacetComponentProps) => {
  return (
    <div className="facet_container">
      <CheckboxComponent id={id} inputLabel={name} />
    </div>
  );
};

export default FacetComponent;
