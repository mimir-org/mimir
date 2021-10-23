import { Node, Project } from "../../../models";
import { ChangeNodeDisplay } from "../helpers/ChangeNodeDisplay";
import { CheckboxWrapper } from "./styled";
import { GetCheckboxColor } from "../helpers";

interface Props {
  node: Node;
  project: Project;
  inputLabel: string;
}
export const Checkbox = ({ node, project, inputLabel }: Props) => (
  <CheckboxWrapper color={GetCheckboxColor(node)}>
    <input type="checkbox" checked={!node?.isHidden ?? false} onChange={ChangeNodeDisplay(node, project)} />
    <div className="checkmark"></div>
    <div className="label">{inputLabel}</div>
  </CheckboxWrapper>
);

export default Checkbox;
