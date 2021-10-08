import { Node, Project } from "../../../models";
import { ChangeNodeDisplay } from "../helpers/ChangeNodeDisplay";

interface Props {
  node: Node;
  project: Project;
  inputLabel: string;
}
export const Checkbox = ({ node, project, inputLabel }: Props) => (
  <label className={"checkbox"}>
    <input type="checkbox" checked={!node?.isHidden ?? false} onChange={ChangeNodeDisplay(node, project)} />
    <span className="checkmark"></span>
    <label className="checkbox_label">{inputLabel}</label>
  </label>
);

export default Checkbox;
