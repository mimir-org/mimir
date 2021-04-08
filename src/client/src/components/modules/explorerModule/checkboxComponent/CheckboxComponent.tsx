import { GetEdgesFromState, GetNodesFromState } from "../../../flow/helpers";
import { GetCheckboxColor } from "../helpers";
import useChangeNodeVisibility from "../hooks/useChangeNodeVisibility";
import "./checkbox.scss";

interface Props {
  nodeId: string;
  edgeId: string | undefined;
  inputLabel: string;
  aspect?: string;
  isParent?: boolean;
  type: string;
}

export const CheckboxComponent = ({
  nodeId,
  edgeId,
  inputLabel,
  isParent,
  aspect,
  type,
}: Props) => {
  const nodes = GetNodesFromState();
  const node = nodes.find((node) => node.id === nodeId);
  const isHidden: any = node.isHidden;

  const edges = GetEdgesFromState();
  const edge = edges.find((edge) => edge.id === edgeId);
  const edgeHidden = edge === undefined ? false : edge.isHidden;

  const handleCheckboxChange = useChangeNodeVisibility(
    nodeId,
    type,
    edgeId,
    isParent,
    isHidden,
    edgeHidden
  );

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
