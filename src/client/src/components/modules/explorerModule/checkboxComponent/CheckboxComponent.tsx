import { NodeType } from "../../../../models/project";
import { GetNodes } from "../../../flow/helpers";
import { GetCheckboxColor } from "../helpers";
import useChangeNodeVisibility from "../hooks/useChangeNodeVisibility";
import "./checkbox.scss";

interface Props {
  nodeId: string;
  inputLabel: NodeType;
  aspect?: NodeType;
  type: NodeType;
}

export const CheckboxComponent = ({
  nodeId,
  inputLabel,
  aspect,
  type,
}: Props) => {
  // Check if node is hidden
  const nodes = GetNodes();
  const node = nodes.find((x) => x.id === nodeId);
  const isHidden = node.isHidden;

  const handleCheckboxChange = useChangeNodeVisibility(node, type);
  const underlineColor = GetCheckboxColor(aspect);

  return (
    <label className={"checkbox " + underlineColor}>
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
