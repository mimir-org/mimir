import { NodeType } from "../../../../models/project";
import { GetNodes } from "../../../flow/helpers";
import { isAspectNode } from "../../../flow/utils";
import { GetCheckboxColor } from "../helpers";
import useChangeNodeVisibility from "../hooks/useChangeNodeVisibility";
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
  const isHidden = node.isHidden;

  const handleCheckboxChange = useChangeNodeVisibility(node, type);
  const isAspect = isAspectNode(node.type);
  const textDecoration = isAspect ? GetCheckboxColor(type) : "none";

  return (
    <label className={"checkbox " + textDecoration}>
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
