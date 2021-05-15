import { AspectElementBox } from "../../../../componentLibrary/box/aspect";
import { NodeType } from "../../../../models/project";
import { LoadState } from "../../../../redux/store/localStorage/localStorage";
import {
  CheckboxComponent,
  CheckboxBlockComponent,
} from "../checkboxComponent";

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
        <CheckboxComponent nodeId={nodeId} inputLabel={name} type={type} />
      ) : (
        <CheckboxBlockComponent nodeId={nodeId} inputLabel={name} />
      )}
    </AspectElementBox>
  );
};

export default AspectChildComponent;
