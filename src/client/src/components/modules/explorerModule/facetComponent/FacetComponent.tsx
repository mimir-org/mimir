import CheckboxComponent from "../checkboxComponent/CheckboxComponent";
import "./facet.scss";

interface FacetComponentProps {
  id: string;
  name: string;
  aspect?: string;
}

export const FacetComponent = ({ id, name, aspect }: FacetComponentProps) => {
  return (
    <div className="facet_container">
      <CheckboxComponent id={id} inputLabel={name} aspect={aspect} />
    </div>
  );
};

export default FacetComponent;
