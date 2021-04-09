import { NODE_TYPE } from "../../../../models/project";
import CheckboxComponent from "../checkboxComponent/CheckboxComponent";
import { FacetWrapper } from "../styled";

interface Props {
  nodeId: string;
  edgeId: string | undefined;
  name: typeof NODE_TYPE;
  aspect?: typeof NODE_TYPE;
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
      />
    </FacetWrapper>
  );
};

export default FacetComponent;
