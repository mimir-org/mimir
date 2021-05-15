import { AspectElementBox } from "../../../../componentLibrary/box/aspect";
import { NodeType } from "../../../../models/project";
import { LoadState } from "../../../../redux/store/localStorage/localStorage";
import { Checkbox, CheckboxBlock } from "../checkboxComponent";

interface Props {
  nodeId: string;
  name: string;
  type: NodeType;
  indent: number;
}

export const AspectChildComponent = ({ nodeId, name, type, indent }: Props) => {
  const isBlockView = LoadState("blockview");

  return (
    <AspectElementBox indent={indent} type={type}>
      {!isBlockView ? (
        <Checkbox nodeId={nodeId} inputLabel={name} type={type} />
      ) : (
        <CheckboxBlock nodeId={nodeId} inputLabel={name} />
      )}
    </AspectElementBox>
  );
};

export default AspectChildComponent;
