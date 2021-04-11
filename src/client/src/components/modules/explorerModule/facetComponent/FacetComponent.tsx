import { NODE_TYPE } from "../../../../models/project";
import CheckboxComponent from "../checkboxComponent/CheckboxComponent";
import { FacetWrapper } from "../styled";

interface Props {
  nodeId: string;
  name: typeof NODE_TYPE;
  type: typeof NODE_TYPE;
  aspect?: typeof NODE_TYPE;
  indent: number;
}

export const FacetComponent = ({
  nodeId,
  name,
  type,
  aspect,
  indent,
}: Props) => {
  return (
    <FacetWrapper indent={indent}>
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
