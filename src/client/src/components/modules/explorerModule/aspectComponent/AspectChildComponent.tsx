import { AspectChildBox } from "../../../../componentLibrary/box/aspect";
import { NodeType } from "../../../../models/project";
import CheckboxComponent from "../checkboxComponent/CheckboxComponent";

interface Props {
  nodeId: string;
  name: string;
  type: NodeType;
  indent: number;
}

export const AspectChildComponent = ({ nodeId, name, type, indent }: Props) => {
  return (
    <AspectChildBox indent={indent} type={type}>
      <CheckboxComponent nodeId={nodeId} inputLabel={name} type={type} />
    </AspectChildBox>
  );
};

export default AspectChildComponent;
