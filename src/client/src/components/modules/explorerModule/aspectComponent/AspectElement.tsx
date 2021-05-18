import { AspectElementBox } from "../../../../componentLibrary/box/aspect";
import { NodeType, NODE_TYPE, VIEW_TYPE } from "../../../../models/project";
import { CheckView } from "../../../../redux/store/localStorage/localStorage";
import { Checkbox, CheckboxBlock } from "../checkboxComponent";

interface Props {
  nodeId: string;
  name: string;
  type: NodeType;
  indent: number;
}

export const AspectChildComponent = ({ nodeId, name, type, indent }: Props) => {
  const isBlockView = CheckView(VIEW_TYPE.BLOCKVIEW);
  const isProduct = type === NODE_TYPE.PRODUCT;

  return (
    <AspectElementBox indent={indent} type={type}>
      {!isBlockView ? (
        <Checkbox nodeId={nodeId} inputLabel={name} type={type} />
      ) : (
        !isProduct && <CheckboxBlock nodeId={nodeId} inputLabel={name} />
      )}
    </AspectElementBox>
  );
};

export default AspectChildComponent;
