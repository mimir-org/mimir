import { NODE_TYPE } from "../../../../models/project";
import CheckboxComponent from "../checkboxComponent/CheckboxComponent";
import { FacetWrapper } from "../styled";

interface Props {
  nodeId: string;
  name: typeof NODE_TYPE;
  type: typeof NODE_TYPE;
  aspect?: typeof NODE_TYPE;
  margin: string;
}

export const FacetComponent = ({
  nodeId,
  name,
  type,
  aspect,
  margin,
}: Props) => {
  return (
    <FacetWrapper margin={margin}>
      <CheckboxComponent
        nodeId={nodeId}
        inputLabel={name}
        aspect={aspect}
        type={type}
      />
    </FacetWrapper>
  );
};

export default FacetComponent;
