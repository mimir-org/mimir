import CheckboxComponent from "../checkboxComponent/CheckboxComponent";
import "./facet.scss";

interface Props {
  nodeId: string;
  edgeId: string | undefined;
  name: string;
  aspect?: string;
}

export const FacetComponent = ({ nodeId, edgeId, name, aspect }: Props) => {
  return (
    <div className="facet_container">
      <CheckboxComponent
        nodeId={nodeId}
        edgeId={edgeId}
        inputLabel={name}
        aspect={aspect}
        type=""
      />
    </div>
  );
};

export default FacetComponent;
