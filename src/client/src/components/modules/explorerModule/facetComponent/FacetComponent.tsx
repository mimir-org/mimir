import CheckboxComponent from "../checkboxComponent/CheckboxComponent";
import { FacetWrapper } from "../styled";

interface Props {
  nodeId: string;
  edgeId: string | undefined;
  name: string;
  aspect?: string;
  margin: string;
}

export const FacetComponent = ({
  nodeId,
  edgeId,
  name,
  aspect,
  margin,
}: Props) => {
  return (
    <FacetWrapper margin={margin}>
      <CheckboxComponent
        nodeId={nodeId}
        edgeId={edgeId}
        inputLabel={name}
        aspect={aspect}
        type=""
      />
    </FacetWrapper>
  );
};

export default FacetComponent;
