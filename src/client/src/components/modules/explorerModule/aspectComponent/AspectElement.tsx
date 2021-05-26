import { AspectElementBox } from "../../../../componentLibrary/box/aspect";
import { NodeType, NODE_TYPE } from "../../../../models/project";
import { IsBlockView } from "../../../flow/helpers/block";
import { Checkbox, CheckboxBlock } from "../checkboxComponent";

interface Props {
  nodeId: string;
  label: string;
  type: NodeType;
  indent: number;
}

export const AspectChildComponent = ({
  nodeId,
  label,
  type,
  indent,
}: Props) => {
  const isProduct = type === NODE_TYPE.PRODUCT;

  return (
    <AspectElementBox indent={indent} type={type}>
      {!IsBlockView() ? (
        <Checkbox nodeId={nodeId} inputLabel={label} type={type} />
      ) : (
        !isProduct && <CheckboxBlock nodeId={nodeId} inputLabel={label} />
      )}
    </AspectElementBox>
  );
};

export default AspectChildComponent;
