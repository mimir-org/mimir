import { NODE_TYPE } from "../../../../models/project";
import { GetEdgesFromState, GetNodesFromState } from "../../../flow/helpers";
import { GetCheckboxColor } from "../helpers";
import useChangeNodeVisibility from "../hooks/useChangeNodeVisibility";
import "./checkbox.scss";

interface Props {
  nodeId: string;
  edgeId: string | undefined;
  inputLabel: typeof NODE_TYPE;
  aspect?: typeof NODE_TYPE;
  isAspect?: boolean;
  type?: typeof NODE_TYPE;
}

export const CheckboxComponent = ({
  nodeId,
  edgeId,
  inputLabel,
  isAspect,
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
    isAspect,
    isHidden,
    edgeHidden
  );

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
