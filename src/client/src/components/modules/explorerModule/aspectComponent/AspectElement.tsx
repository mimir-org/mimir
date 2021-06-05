import { AspectElementBox } from "../../../../componentLibrary/box/aspect";
import { Node } from "../../../../models/project";
import { IsBlockView } from "../../../flow/helpers/block";
import { IsProductNode } from "../../../flow/helpers/common";
import { Checkbox, CheckboxBlock } from "../checkboxComponent";

interface Props {
  node: Node;
  label: string;
  indent: number;
}

export const AspectElement = ({ node, label, indent }: Props) => {
  return (
    <AspectElementBox indent={indent} node={node}>
      {!IsBlockView() ? (
        <Checkbox node={node} inputLabel={label} />
      ) : (
        !IsProductNode(node) && <CheckboxBlock node={node} inputLabel={label} />
      )}
    </AspectElementBox>
  );
};

export default AspectElement;
