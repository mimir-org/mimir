import { NodeType } from "../../../../models/project";
import CheckboxComponent from "../checkboxComponent/CheckboxComponent";
import { FacetWrapper } from "../styled";

interface Props {
  nodeId: string;
  name: NodeType;
  type: NodeType;
  aspect?: NodeType;
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
