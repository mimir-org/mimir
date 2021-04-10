import { NODE_TYPE } from "../../../../models/project";
import CheckboxComponent from "../checkboxComponent/CheckboxComponent";
import { FacetWrapper } from "../styled";

interface Props {
  nodeId: string;
  name: typeof NODE_TYPE;
  aspect?: typeof NODE_TYPE;
  margin: string;
}

export const FacetComponent = ({ nodeId, name, aspect, margin }: Props) => {
  return (
    <FacetWrapper margin={margin}>
      <CheckboxComponent nodeId={nodeId} inputLabel={name} aspect={aspect} />
    </FacetWrapper>
  );
};

export default FacetComponent;
