import { Node, Project } from "../../../../models";
import { ChangeNodeDisplay } from "../helpers/ChangeNodeDisplay";

interface Props {
  node: Node;
  project: Project;
  inputLabel: string;
}
export const Checkbox = ({ node, project, inputLabel }: Props) => {
  const isHidden = node?.isHidden ?? false;
  const handleChange = ChangeNodeDisplay(node, project);

  return (
    <label className={"checkbox"}>
      <input type="checkbox" checked={!isHidden} onChange={handleChange} />
      <span className="checkmark"></span>
      <label className="checkbox_label">{inputLabel}</label>
    </label>
  );
};

export default Checkbox;
