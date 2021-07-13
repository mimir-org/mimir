import { AspectElementBox } from "../../../../compLibrary/box/aspect";
import { Node, Project } from "../../../../models";
import { IsBlockView } from "../../../flow/helpers/block";
import { IsProduct } from "../../../flow/helpers/common";
import { Checkbox, CheckboxBlock } from "../checkboxComponent";

interface Props {
  node: Node;
  label: string;
  indent: number;
  project: Project;
}

export const AspectElement = ({ node, label, indent, project }: Props) => (
  <AspectElementBox indent={indent} node={node}>
    {!IsBlockView() ? (
      <Checkbox node={node} project={project} inputLabel={label} />
    ) : (
      !IsProduct(node) && <CheckboxBlock node={node} inputLabel={label} />
    )}
  </AspectElementBox>
);

export default AspectElement;
