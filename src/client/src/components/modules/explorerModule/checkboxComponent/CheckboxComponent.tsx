import { NodeType } from "../../../../models/project";
import useChangeNodeVisibility from "../hooks/useChangeNodeVisibility";
import { GetNodes } from "../../../flow/helpers";
import "./checkbox.scss";

interface Props {
  nodeId: string;
  inputLabel: string;
  type: NodeType;
}

export const CheckboxComponent = ({ nodeId, inputLabel, type }: Props) => {
  // Check if node is hidden
  const nodes = GetNodes();
  const node = nodes.find((x) => x.id === nodeId);
  const isHidden = !node ? false : node.isHidden;

  const handleCheckboxChange = useChangeNodeVisibility(node, type);

  return (
    <label className={"checkbox"}>
      <input
        type="checkbox"
        checked={!isHidden}
        onChange={handleCheckboxChange}
      />
      <span className="checkmark"></span>
      <label className="checkbox_label">{inputLabel}</label>
    </label>
  );
};

export default CheckboxComponent;
