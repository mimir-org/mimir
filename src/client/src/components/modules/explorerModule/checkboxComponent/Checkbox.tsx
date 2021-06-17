import { Node } from "../../../../models";
import { ChangeNodeDisplay } from "../helpers/ChangeNodeDisplay";

interface Props {
  node: Node;
  inputLabel: string;
}
export const Checkbox = ({ node, inputLabel }: Props) => {
  let isHidden = node?.isHidden ?? false;

  const handleChange = ChangeNodeDisplay(node);

  return (
    <label className={"checkbox"}>
      <input type="checkbox" checked={!isHidden} onChange={handleChange} />
      <span className="checkmark"></span>
      <label className="checkbox_label">{inputLabel}</label>
    </label>
  );
};

export default Checkbox;
