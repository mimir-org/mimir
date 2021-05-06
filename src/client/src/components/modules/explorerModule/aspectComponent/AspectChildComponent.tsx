import { NodeType } from "../../../../models/project";
import CheckboxComponent from "../checkboxComponent/CheckboxComponent";
import { AspectChildWrapper } from "../styled";

interface Props {
  nodeId: string;
  name: string;
  type: NodeType;
  indent: number;
}

export const AspectChildComponent = ({ nodeId, name, type, indent }: Props) => {
  return (
    <AspectChildWrapper indent={indent}>
      <CheckboxComponent nodeId={nodeId} inputLabel={name} type={type} />
    </AspectChildWrapper>
  );
};

export default AspectChildComponent;
