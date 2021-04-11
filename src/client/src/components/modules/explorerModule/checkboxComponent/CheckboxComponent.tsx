import { NODE_TYPE } from "../../../../models/project";
import { GetNodes } from "../../../flow/helpers";
import { GetCheckboxColor } from "../helpers";
import useChangeNodeVisibility from "../hooks/useChangeNodeVisibility";
import "./checkbox.scss";

interface Props {
  nodeId: string;
  inputLabel: typeof NODE_TYPE;
  aspect?: typeof NODE_TYPE;
  type: typeof NODE_TYPE;
}

export const CheckboxComponent = ({
  nodeId,
  inputLabel,
  aspect,
  type,
}: Props) => {
  // Check if node is hidden
  const nodes = GetNodes();
  const node = nodes.find((node) => node.id === nodeId);
  const isHidden: any = node.isHidden;

  const handleCheckboxChange = useChangeNodeVisibility(nodeId, type, isHidden);
  const underlineColor = GetCheckboxColor(aspect.toString());

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
